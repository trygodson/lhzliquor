import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {changeLoading} from "../loader/loader";
import {StackActions} from "@react-navigation/native";
import {navigationRef} from "../../../Main";
import {SET_STORAGE_ITEM} from "../../../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getOrders} from "../../../services/orders";

const initialState = {
  loading: false,
  error: null,
  response: null,
  response2: null,
};
const getOrdersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    filterOrdersAction(state, action) {
      if (state.response !== null || state.response === []) {
        if (action.payload === "all") {
          state.response2 = state.response;
        } else {
          state.response2 = state.response.filter((item) => item?.order_status === action.payload);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(getOrdersAction.fulfilled, (state, action) => {
      state.response = action.payload;
      state.response2 = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrdersAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const getOrdersAction = createAsyncThunk("orders", async (data, thunkApi) => {
  return getOrders(data)
    .then(async (response) => {
      console.log(response, "----response from------");
      if (response?.status === true) {
        return response?.data?.orders;
      } else {
        return thunkApi.rejectWithValue(JSON.stringify(response.message));
      }
    })

    .catch((error) => {
      return thunkApi.rejectWithValue(error);
    });
});

export default getOrdersSlice.reducer;
export const {filterOrdersAction} = getOrdersSlice.actions;
