import { configureStore } from "@reduxjs/toolkit";
import CurrencySlice from "./CurrencySlice";

const Store = configureStore({
  reducer: {
    currency: CurrencySlice,
  },
});

export default Store;
