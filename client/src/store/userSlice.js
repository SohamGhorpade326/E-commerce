import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get the base URL from the environment variable for production,
// default to an empty string for local development (which will use the proxy).
const API_URL = import.meta.env.VITE_API_URL || '';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  userDetails: null,
  loading: false,
  error: null,
  success: false,
};

// LOGIN
export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${API_URL}/api/users/login`, { email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

// REGISTER
export const register = createAsyncThunk('user/register', async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(`${API_URL}/api/users`, { name, email, password }, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
});

// GET USER DETAILS
export const getUserDetails = createAsyncThunk('user/getDetails', async (_, { getState, rejectWithValue }) => {
    try {
        const { user: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`${API_URL}/api/users/profile`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message);
    }
});

// UPDATE USER PROFILE
export const updateUserProfile = createAsyncThunk('user/updateProfile', async (userData, { getState, rejectWithValue }) => {
    try {
        const { user: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(`${API_URL}/api/users/profile`, userData, config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message);
    }
});

// ... (rest of the userSlice file is the same)
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
      state.userDetails = null;
      state.loading = false;
      state.error = null;
    },
    resetUpdateSuccess: (state) => {
        state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => { state.loading = true; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserDetails.pending, (state) => { state.loading = true; })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => { state.loading = true; })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload;
        state.userDetails = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetUpdateSuccess } = userSlice.actions;
export default userSlice.reducer;
