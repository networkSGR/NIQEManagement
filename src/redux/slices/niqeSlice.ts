// src/redux/slices/niqeSlice.js
import { NiqeData } from '@/types/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
const initialState = {
  niqeData: [] as NiqeData[],
  status: 'idle',
  error: null as null | unknown
};

// Thunk to fetch data from the API
export const fetchNiqeData = createAsyncThunk(
  'niqe/fetchNiqeData',
  async (_, { rejectWithValue }) => {
    try {
        const token = Cookies.get('accessToken'); // Or localStorage, depending on your implementation
        const response = await axios.get('http://localhost:3000/api/niqe/getAllNiqe', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        return response.data.data; // Return the data from the response
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
  );

  export const approveNiqeData = createAsyncThunk('niqe/approveNiqeData', async (_id: string) => {
    const token = Cookies.get('accessToken'); // Or localStorage, depending on your implementation
    const response = await axios.patch(`http://localhost:3000/api/niqe/approve/${_id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the authorization header
      },
    });
    return response.data;
  });
  
  export const rejectNiqeData = createAsyncThunk('niqe/rejectNiqeData', async (_id: string) => {
    const token = Cookies.get('accessToken'); // Or localStorage, depending on your implementation
    const response = await axios.patch(`http://localhost:3000/api/niqe/reject/${_id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the authorization header
      },
    });
    return response.data;
  });
  const niqeSlice = createSlice({
    name: 'niqe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchNiqeData.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchNiqeData.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.niqeData = action.payload;
        })
        .addCase(fetchNiqeData.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'An error occurred';
        }).addCase(approveNiqeData.fulfilled, (state, action) => {
          const approvedItem = action.payload;
          state.niqeData = state.niqeData.map((item) =>
            item._id === approvedItem._id ? approvedItem : item
          );
        })
        .addCase(rejectNiqeData.fulfilled, (state, action) => {
          const rejectedItem = action.payload;
          state.niqeData = state.niqeData.map((item) =>
            item._id === rejectedItem._id ? rejectedItem : item
          );
        });
    }
  });
export default niqeSlice.reducer;
