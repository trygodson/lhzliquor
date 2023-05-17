import {ApiEndpoints} from "../utils/endPoints";
import shopAPi from "../utils/shopApi";
import Global from "./global";

export async function orderDetails(id) {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.ORDER + id, null, "GET", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getOrders(id) {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.ORDERS, null, "GET", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getUserAddressService(id) {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.USER_ADDRESS, null, "GET", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
