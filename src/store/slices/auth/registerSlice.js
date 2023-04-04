import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {changeLoading} from "../loader/loader";
import {StackActions} from "@react-navigation/native";
import {navigationRef} from "../../../Main";
import {SET_STORAGE_ITEM} from "../../../utils/storage";
import {SignUpUser} from "../../../services/auth";
import {setLogin} from "./loginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: false,
  error: null,
  response: null,
};
const registerSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const registerAction = createAsyncThunk("signup", async (data, thunkApi) => {
  thunkApi.dispatch(changeLoading(true));
  return SignUpUser(data)
    .then(async (response) => {
      console.log(response, "----response from------");
      if (response?.status === true) {
        thunkApi.dispatch(changeLoading(false));
        await AsyncStorage.setItem("token", response?.letscms_token);
        SET_STORAGE_ITEM("user", response?.data?.user);

        thunkApi.dispatch(setLogin(true));
        navigationRef.dispatch(StackActions.replace("AppStack", {}));
        return response;
      } else {
        thunkApi.dispatch(changeLoading(false));
        return thunkApi.rejectWithValue(JSON.stringify(response.errors));
      }
    })

    .catch((error) => {
      thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error);
    });
});

export default registerSlice.reducer;
// export const {changeLoading, reset} = loginSlice.actions;
