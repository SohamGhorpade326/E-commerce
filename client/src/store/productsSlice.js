import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

export const listProducts = createAsyncThunk('products/list', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

export const listProductDetails = createAsyncThunk('products/details', async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  });

// ... (rest of the productsSlice file is the same)
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(listProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
