import {loginAction} from "../store/slices/auth/loginSlice";
import {registerAction} from "../store/slices/auth/registerSlice";
import {createOrderAction} from "../store/slices/cart/createOrder";
import {getFeaturedProductSliderAction} from "../store/slices/products/featuredProduct";
import {customToast} from "./toast";

export const toastFunc = () => (next) => (action) => {
  switch (action.type) {
    case getFeaturedProductSliderAction.rejected.type:
      customToast(action.payload);
      break;
    case createOrderAction.rejected.type:
      customToast("Something went Wrong " + action.payload);
      break;
    case registerAction.rejected.type:
      customToast("Error" + action.payload);
      break;
    case loginAction.rejected.type:
      customToast("Error" + action.payload);
      break;
    default:
      break;
  }
  return next(action);
};
