import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {changeLoading} from "../loader/loader";
import {StackActions} from "@react-navigation/native";
import {navigationRef} from "../../../Main";
import {SET_STORAGE_ITEM} from "../../../utils/storage";
import {LogInUser} from "../../../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: false,
  error: null,
  response: null,
  LOGIN: false,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.LOGIN = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.LOGIN = true;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const loginAction = createAsyncThunk("login", async (data, thunkApi) => {
  thunkApi.dispatch(changeLoading(true));
  return LogInUser(data)
    .then(async (response) => {
      console.log(response, "----response from------");
      if (response?.status === true) {
        thunkApi.dispatch(changeLoading(false));
        await AsyncStorage.setItem("token", response?.letscms_token);
        SET_STORAGE_ITEM("user", response?.data?.user);
        navigationRef.dispatch(StackActions.replace("AppStack", {}));
        return response;
      } else {
        thunkApi.dispatch(changeLoading(false));
        return thunkApi.rejectWithValue(JSON.stringify(response.message));
      }
    })

    .catch((error) => {
      thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error);
    });
});

export default loginSlice.reducer;
export const {setLogin} = loginSlice.actions;
