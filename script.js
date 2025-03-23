// Weather App Core Logic
class WeatherApp {
    constructor() {
      this.apiBaseUrl = 'https://api.open-meteo.com/v1/forecast';
      this.geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  
      this.elements = {
        citySearch: document.getElementById('citySearch'),
        searchBtn: document.getElementById('searchBtn'),
        geolocateBtn: document.getElementById('geolocateBtn'),
        currentWeather: document.getElementById('currentWeather'),
        forecastGrid: document.getElementById('forecastGrid'),
        humidityValue: document.getElementById('humidityValue'),
        windValue: document.getElementById('windValue'),
        pressureValue: document.getElementById('pressureValue'),
        uvValue: document.getElementById('uvValue'),
        loadingOverlay: document.querySelector('.loading-overlay'),
        themeToggle: document.getElementById('themeToggle')
      };
  
      this.weatherCodes = {
        0: { description: "Clear sky", emoji: "☀️" },
        1: { description: "Mainly clear", emoji: "🌤️" },
        2: { description: "Partly cloudy", emoji: "⛅" },
        3: { description: "Overcast", emoji: "☁️" },
        45: { description: "Foggy", emoji: "🌫️" },
        51: { description: "Light drizzle", emoji: "🌦️" },
        61: { description: "Slight rain", emoji: "🌧️" },
        63: { description: "Moderate rain", emoji: "🌧️" },
        65: { description: "Heavy rain", emoji: "⛈️" },
        71: { description: "Slight snow", emoji: "❄️" },
        95: { description: "Thunderstorm", emoji: "⛈️" }
      };
  
      this.bindEvents();
      this.loadTheme();
    }
  
    bindEvents() {
      this.elements.searchBtn.addEventListener('click', () => this.handleSearch());
      this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
      this.elements.geolocateBtn.addEventListener('click', () => this.detectLocation());
      this.elements.citySearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSearch();
      });
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        this.elements.themeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
      }
    
      loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          document.body.classList.add('dark-mode');
          this.elements.themeToggle.textContent = '☀️ Light Mode';
        }
      }
  
    showLoading() {
      this.elements.loadingOverlay.style.display = 'flex';
      this.elements.currentWeather.innerHTML = '';
      this.elements.forecastGrid.innerHTML = '';
    }
  
    hideLoading() {
      this.elements.loadingOverlay.style.display = 'none';
    }
  
    async handleSearch() {
      const query = this.elements.citySearch.value.trim();
      if (!query) return;
  
      this.showLoading();
      try {
        const coordinates = await this.geocodeLocation(query);
        await this.fetchWeatherData(coordinates.latitude, coordinates.longitude, coordinates.name);
      } catch (error) {
        this.showError(error.message);
      }
    }
  
    async detectLocation() {
      this.showLoading();
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await this.fetchWeatherData(latitude, longitude, "My Location");
          },
          (error) => this.showError("Location access denied")
        );
      } else {
        this.showError("Geolocation not supported");
      }
    }
  
    async geocodeLocation(query) {
      const isCoordinates = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(query);
  
      if (isCoordinates) {
        const [latitude, longitude] = query.split(',').map(parseFloat);
        return { latitude, longitude, name: 'Custom Location' };
      }
  
      try {
        const response = await fetch(`${this.geocodingUrl}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
        const data = await response.json();
  
        if (!data.results || data.results.length === 0) {
          throw new Error('Location not found');
        }
  
        const { latitude, longitude, name, country } = data.results[0];
        return { latitude, longitude, name: `${name}, ${country}` || 'Unknown Location' };
      } catch (error) {
        throw new Error('Error fetching location data');
      }
    }
  
    async fetchWeatherData(latitude, longitude, locationName) {
      try {
        const response = await fetch(`${this.apiBaseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`);
        const data = await response.json();
        this.renderWeatherData(data, locationName);
      } catch (error) {
        this.showError('Failed to fetch weather data');
      }
    }
  
    renderWeatherData(weatherData, locationName) {
      this.hideLoading();
      const currentWeather = weatherData.current_weather;
      const dailyData = weatherData.daily;
      const hourlyData = weatherData.hourly;
  
      const weatherCode = currentWeather.weathercode;
      const weatherInfo = this.weatherCodes[weatherCode] || { description: 'Unknown', emoji: '❓' };
  
      this.elements.currentWeather.innerHTML = `
        <div class="location-header">
          <h2>${locationName}</h2>
          <p>${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div class="temperature-section">
          <div class="temp-display">
            <h3>${currentWeather.temperature}°C</h3>
            <p>${weatherInfo.emoji} ${weatherInfo.description}</p>
          </div>
        </div>
      `;
  
      this.elements.forecastGrid.innerHTML = dailyData.time.slice(1, 8).map((date, index) => `
        <div class="forecast-day">
          <p>${new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
          <p class="forecast-emoji">${this.weatherCodes[dailyData.weathercode[index]]?.emoji || '❓'}</p>
          <p class="forecast-temp">
            ${dailyData.temperature_2m_max[index]}°C / 
            ${dailyData.temperature_2m_min[index]}°C
          </p>
        </div>
      `).join('');
  
      this.elements.humidityValue.textContent = `${hourlyData.relativehumidity_2m[0]}%`;
      this.elements.windValue.textContent = `${currentWeather.windspeed} km/h`;
      this.elements.pressureValue.textContent = 'N/A';
      this.elements.uvValue.textContent = 'Moderate';
    }
  
    showError(message) {
      this.hideLoading();
      this.elements.currentWeather.innerHTML = `
        <div class="error-message">
          <p>🚨 ${message}</p>
          <small>Please try again or check your connection</small>
        </div>
      `;
    }
  }
  
  // Initialize the app
  document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
  });
  