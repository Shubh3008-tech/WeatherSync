import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/appwrite';

export const checkSession = createAsyncThunk('auth/checkSession', async () => {
  try {
    const user = await authService.getAccount();
    return user ? { user } : { user: null };
  } catch (error) {
    return { user: null };
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const user = await authService.login(email, password);
  return { user };
});

export const register = createAsyncThunk('auth/register', async ({ email, password, name }) => {
  const user = await authService.register(email, password, name);
  return { user };
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
  return {};
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error?.message || null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Registration failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default authSlice.reducer;
