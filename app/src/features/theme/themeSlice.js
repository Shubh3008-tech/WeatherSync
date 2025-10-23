import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.mode);
      const root = document.documentElement;
      if (state.mode === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    },
    setTheme(state, action) {
      state.mode = action.payload;
      localStorage.setItem('theme', state.mode);
      const root = document.documentElement;
      if (state.mode === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    },
    initTheme(state) {
      const root = document.documentElement;
      if (state.mode === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }
});

export const { toggleTheme, setTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;
