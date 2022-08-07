import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import ProductSlice, { productsFetch } from "./featucer/Productslice";
import { productApi } from "./featucer/ProductApi";
import CartsSlice, { getTotals } from "./featucer/CartsSlice";
import { categoryProductsFetch } from "./featucer/Categroy";

const store = configureStore({
  reducer: {
    reducerProduct: ProductSlice,
    cart: CartsSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefulatMiddleware) =>
    getDefulatMiddleware().concat(productApi.middleware),
});
store.dispatch(productsFetch());
store.dispatch(categoryProductsFetch());
store.dispatch(getTotals());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
