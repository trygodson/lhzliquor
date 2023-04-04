import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CLEAR_STORAGE, GET_STORAGE_ITEM, SET_STORAGE_ITEM} from "../../../utils/storage";

const initialState = {
  loading: false,
  error: null,
  wishlist: [],
};
const wishListSlice = createSlice({
  name: "getWishlistSlice",
  initialState,
  reducers: {
    addToWishList(state, action) {
      const dd = state.wishlist?.findIndex((item) => item.id === action.payload.id);

      if (dd === -1) {
        state.wishlist = [...state.wishlist, action.payload];
        SET_STORAGE_ITEM("wishlist", state.wishlist);
      } else {
        state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
        SET_STORAGE_ITEM("wishlist", state.wishlist);
      }
    },
    removeItemFromWishList(state, action) {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
      SET_STORAGE_ITEM("wishlist", state.wishlist);
    },

    clearWishlist: (state, action) => {
      CLEAR_STORAGE();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWishListItemsActions.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(getWishListItemsActions.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.loading = false;
    });
    builder.addCase(getWishListItemsActions.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const getWishListItemsActions = createAsyncThunk("getWishListItems", async (data, thunkApi) => {
  return GET_STORAGE_ITEM("wishlist")
    .then((response) => {
      console.log(response, "---- the response from -------");
      return response;
    })

    .catch((error) => {
      // thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error.message);
    });
});

export default wishListSlice.reducer;
export const {addToWishList, clearWishlist, removeItemFromWishList} = wishListSlice.actions;
