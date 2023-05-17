import {toastFunc} from "../utils/toastMiddleWare";
import {configureStore} from "@reduxjs/toolkit";
import LoaderSlice from "./slices/loader/loader";
import getFeaturesSliderProductsSlice from "./slices/products/featuredProduct";
import getFeaturesCategorySlice from "./slices/products/featuredCategory";
import getFeaturesTabProductsSlice from "./slices/products/featuredProductTab";
import getProductDetailsSlice from "./slices/products/productDetails";
import searchProductsSlice from "./slices/products/searchProduct";
import getProductsByCategorySlice from "./slices/products/productsByCategory";
import cartSlice from "./slices/cart/cart";
import cartCountSlice from "./slices/cart/cartcountSlice";
import paymentGatewaySlice from "./slices/cart/paymentGateways";
import createOrderSlice from "./slices/cart/createOrder";
import wishListSlice from "./slices/wishlist/wishlist";
import loginSlice from "./slices/auth/loginSlice";
import registerSlice from "./slices/auth/registerSlice";
import getOrdersSlice from "./slices/orders/orders";
import userAddressSlice from "./slices/userAddress/userAddress";

export const store = configureStore({
  reducer: {
    loader: LoaderSlice,
    login: loginSlice,
    register: registerSlice,
    cartCount: cartCountSlice,
    getFeaturesSliderProducts: getFeaturesSliderProductsSlice,
    getFeaturesCategory: getFeaturesCategorySlice,
    getFeaturesTabProducts: getFeaturesTabProductsSlice,
    getProductDetails: getProductDetailsSlice,
    getProductsByCategory: getProductsByCategorySlice,
    searchProducts: searchProductsSlice,
    paymentGateway: paymentGatewaySlice,
    createOrder: createOrderSlice,
    wishList: wishListSlice,
    cart: cartSlice,
    getOrders: getOrdersSlice,
    userAddress: userAddressSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(toastFunc);
  },
});
