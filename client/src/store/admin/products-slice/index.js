import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result?.data;
  },
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchall",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get",
    );
    console.log("API response:", result?.data);
    return result?.data;
  },
);

export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    // {id, formData} it is used when there is need more tha one key
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result?.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`,
    );
    return result?.data;
  },
);

const initialState = {
  isLoading: false,
  productList: [],
};

const AdminProducSlice = createSlice({
  name: "adminProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log("fetchAllProducts.fulfilled", action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      });
  },
});

export default AdminProducSlice.reducer;
