import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllFilteredProducts = createAsyncThunk(
  "shoppingProducts/fetchAllFilteredProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/api/products/get");
    return response.data;
  },
);

const initialState = {
  isLoading: false,
  productList: [],
};

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllFilteredProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchAllFilteredProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    });
  },
});

export default shoppingProductSlice.reducer;
