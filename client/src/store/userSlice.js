import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  userDetails: null, // <-- ADDED for profile page
  loading: false,
  error: null,
  success: false, // <-- ADDED for update success message
};

// LOGIN
export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post('/api/users/login', { email, password }, config);
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
      const { data } = await axios.post('/api/users', { name, email, password }, config);
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
        const { data } = await axios.get('/api/users/profile', config);
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
        const { data } = await axios.put('/api/users/profile', userData, config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message);
    }
});


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
      // Login
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
      // Register
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
      // Get User Details
      .addCase(getUserDetails.pending, (state) => { state.loading = true; })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User Profile
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
