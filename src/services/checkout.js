import {ApiEndpoints} from "../utils/endPoints";
import shopAPi from "../utils/shopApi";
import Global from "./global";

export async function checkOutService() {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.CHECKOUT, null, "GET", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getAddressService() {
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.SHIPPING, null, "GET", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function paymentIntentService(payload) {
  console.log(await Global.getToken(), "await Global.getToken(),");
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.PAYMENTINTENTS, null, "POST", payload, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function createOrderService(payload) {
  console.log(await Global.getToken(), "await Global.getToken(),");
  let header = {
    "Content-Type": "application/json",
    letscms_token: await Global.getToken(),
  };
  try {
    const response = await shopAPi(ApiEndpoints.CREATEORDER, null, "POST", payload, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
