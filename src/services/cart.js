import {ApiEndpoints} from "../utils/endPoints";
import shopAPi from "../utils/shopApi";
import Global from "./global";

export async function addtocart(payload) {
  let header = {
    letscms_token: await Global.getToken(),
    "Content-Type": "application/json",
  };
  // console.log(payload, "----payload-----");
  try {
    const response = await shopAPi(ApiEndpoints.ADDTOCART, null, "POST", payload, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getCartcount() {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.CARTCOUNT, null, "GET", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getCart() {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.CART, null, "GET", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateQuantityService(payload) {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.UPDATEQUANTITY, null, "POST", payload, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function removeItemService(key) {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.REMOVE + key, null, "POST", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addCouponService(coupon) {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.ADDCOUPON + coupon, null, "GET", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
