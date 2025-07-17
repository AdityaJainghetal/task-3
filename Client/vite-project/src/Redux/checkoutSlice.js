import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../base_URL";

export const saveDesign = createAsyncThunk(
  "checkout/saveDesign",
  async (design, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      console.log(auth, "checkout slice authfjdskjfdskfjdsklfjdskjfldskjf");
      const response = await axios.post(`${API_URL}/checkout`, design, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data, "response fjdsklfjdskl");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const fetchDesigns = createAsyncThunk(
  "checkout/fetchDesigns",
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const response = await axios.get(`${API_URL}/checkout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    design: {
      pageTitle: "",
      productImage: "",
      productName: "",
      productPrice: "",
      buttonText: "Buy Now",
      primaryColor: "#3B82F6",
      secondaryColor: "#1F2937",
      fontStyle: "Arial",
      formFields: {
        name: true,
        email: true,
        phone: false,
      },
      utmParams: {
        source: "",
        medium: "",
        campaign: "",
        term: "",
        content: "",
      },
    },
    designs: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateDesign: (state, action) => {
      state.design = { ...state.design, ...action.payload };
    },
    resetDesign: (state) => {
      state.design = {
        pageTitle: "",
        productImage: "",
        productName: "",
        productPrice: "",
        buttonText: "Buy Now",
        primaryColor: "#3B82F6",
        secondaryColor: "#1F2937",
        fontStyle: "Arial",
        formFields: {
          name: true,
          email: true,
          phone: false,
        },
        utmParams: {
          source: "",
          medium: "",
          campaign: "",
          term: "",
          content: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDesign.fulfilled, (state, action) => {
        state.loading = false;
        state.designs.push(action.payload);
      })
      .addCase(saveDesign.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to save design";
      })
      .addCase(fetchDesigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesigns.fulfilled, (state, action) => {
        state.loading = false;
        state.designs = action.payload;
      })
      .addCase(fetchDesigns.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch designs";
      });
  },
});

export const { updateDesign, resetDesign } = checkoutSlice.actions;
export default checkoutSlice.reducer;
