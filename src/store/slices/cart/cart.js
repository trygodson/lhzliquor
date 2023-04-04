import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFeaturedCategories} from "../../../services/getProducts";

const initialState = {
  // loading: false,
  // error: null,
  cart: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  shipping: 0,
};
const cartSlice = createSlice({
  name: "getFeatureCategorySlice",
  initialState,
  reducers: {
    addToCart(state, action) {
      const dd = state.cart.findIndex((item) => item.id === action.payload.id);

      if (dd === -1) {
        state.cart = [...state.cart, action.payload];
      } else {
        state.cart[dd].quantity += 1;
      }
    },
    removeItemFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    decreaseCartQuantity(state, action) {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (state.cart[itemIndex].quantity === 1) {
        const newState = state.cart.filter((item) => item.id !== action.payload.id);
        state.cart = newState;
      } else if (state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
      }
    },

    getTotal(state, action) {
      let {total, quantity} = state.cart.reduce(
        (cartTotal, cartItem) => {
          const {regular_price, quantity} = cartItem;
          const itemTotal = regular_price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },

    clearCart: (state, action) => initialState,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getFeaturedCategoryAction.pending, (state) => {
  //     {
  //       state.loading = true;
  //     }
  //   });
  //   builder.addCase(getFeaturedCategoryAction.fulfilled, (state, action) => {
  //     state.home = action.payload.slice(0, 5);
  //     state.shop = action.payload;
  //     state.loading = false;
  //   });
  //   builder.addCase(getFeaturedCategoryAction.rejected, (state, action) => {
  //     {
  //       state.error = action.payload;
  //       state.loading = false;
  //     }
  //   });
  // },
});
// export const getFeaturedCategoryAction = createAsyncThunk("getFeatureCategory", async ({data}, thunkApi) => {
//   return getFeaturedCategories()
//     .then((response) => {
//       return response;
//     })

//     .catch((error) => {
//       // thunkApi.dispatch(changeLoading(false));
//       return thunkApi.rejectWithValue(error.message);
//     });
// });

export default cartSlice.reducer;
export const {addToCart, removeItemFromCart, getTotal, decreaseCartQuantity, clearCart} = cartSlice.actions;
