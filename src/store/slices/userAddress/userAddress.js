import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getUserAddressService} from "../../../services/orders";

const initialState = {
  loading: false,
  error: null,
  response: null,
};
const userAddressSlice = createSlice({
  name: "userAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAddressAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(getUserAddressAction.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserAddressAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const getUserAddressAction = createAsyncThunk("userAddress", async (data, thunkApi) => {
  return getUserAddressService(data)
    .then(async (response) => {
      if (response?.status === true) {
        return response?.data?.address;
      } else {
        return thunkApi.rejectWithValue(JSON.stringify(response.message));
      }
    })

    .catch((error) => {
      return thunkApi.rejectWithValue(error);
    });
});

export default userAddressSlice.reducer;
