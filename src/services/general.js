import {ApiEndpoints} from "../utils/endPoints";
import shopAPi from "../utils/shopApi";

export async function getPaymentGateways({queries}) {
  let header = {
    "Content-Type": "application/json; charset=UTF-8",
  };
  try {
    const response = await shopAPi(`${ApiEndpoints.PAYMENT_GATEWAYS}`, null, "GET", null, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function createOrder({queries, payload}) {
  let header = {
    "Content-Type": "application/json; charset=UTF-8",
  };
  try {
    const response = await shopAPi(`${ApiEndpoints.ORDERS}`, null, "POST", payload, true, header);
    return response;
  } catch (error) {
    throw error;
  }
}
