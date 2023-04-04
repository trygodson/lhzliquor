import {StackActions} from "@react-navigation/native";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {navigationRef} from "../../../Main";
import {createOrder, getPaymentGateways} from "../../../services/general";
import {getFeaturedCategories} from "../../../services/getProducts";
import {changeLoading} from "../loader/loader";
import {clearCart} from "./cart";

const initialState = {
  loading: false,
  error: null,
  response: null,
};
const createOrderSlice = createSlice({
  name: "createOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrderAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(createOrderAction.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
    builder.addCase(createOrderAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const createOrderAction = createAsyncThunk("createOrder", async ({data}, thunkApi) => {
  thunkApi.dispatch(changeLoading(true));
  return createOrder({payload: data})
    .then((response) => {
      if (response) {
        thunkApi.dispatch(clearCart());
        thunkApi.dispatch(changeLoading(false));
        navigationRef.dispatch(StackActions.replace("SuccessScreen", {data: response}));
        return response;
      }
    })

    .catch((error) => {
      // thunkApi.dispatch(changeLoading(false));
      thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error.message);
    });
});

export default createOrderSlice.reducer;
