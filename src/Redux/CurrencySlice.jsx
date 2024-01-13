import { createSlice } from "@reduxjs/toolkit";

const CurrencySlice = createSlice({
  name: "currency",
  initialState: {
    currency: "inr",
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = CurrencySlice.actions;
export default CurrencySlice.reducer;
