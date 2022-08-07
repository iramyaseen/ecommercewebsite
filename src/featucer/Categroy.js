import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categoryItem: [],
  categoryStatus: null,
};

// Action products
export const categoryProductsFetch = createAsyncThunk(
  "categorys/categoryProductsFetch",
  async (category) => {
    if (category == null) {
      return [];
    }
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    return response?.data;
  }
);

// reducers
const cateproduct = createSlice({
  name: "categorys",
  initialState,
  reducers: {},
  extraReducers: {
    [categoryProductsFetch.pending]: (state, action) => {
      state.categoryStatus = "pendingCate";
    },
    [categoryProductsFetch.fulfilled]: (state, action) => {
      state.categoryStatus = "successCate";
      state.categoryItem = action.payload;
    },
    [categoryProductsFetch.rejected]: (state, action) => {
      state.categoryStatus = "rejectedCate";
    },
  },
});

export default cateproduct.reducer;
