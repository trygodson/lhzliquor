import {ApiEndpoints} from "../utils/endPoints";
import shopAPi from "../utils/shopApi";

export async function getProducts({payload, queries}) {
  let header = {
    "Content-Type": "application/json; charset=UTF-8",
    // "Access-Control-Allow-Origin": "*",
    // letscms_token: JSON.parse(await Global.getToken()),
  };

  const response = await shopAPi(`${ApiEndpoints.PRODUCTS}/${queries}`, null, "GET", null, false, header);
  return response;
}
export async function getFeaturedProducts({queries}) {
  let header = {
    "Content-Type": "application/json; charset=UTF-8",
    // "Access-Control-Allow-Origin": "*",
    // letscms_token: JSON.parse(await Global.getToken()),
  };

  const response = await shopAPi(`${ApiEndpoints.PRODUCTS}${queries}`, null, "GET", null, false, header);
  return response;
}
export async function searchProductsService({queries}) {
  let header = {
    "Content-Type": "application/json; charset=UTF-8",
    // "Access-Control-Allow-Origin": "*",
    // Authorization: JSON.parse(await Global.getToken()),
  };

  const response = await shopAPi(`${ApiEndpoints.PRODUCTS}/${queries}`, null, "GET", null, false, header);
  return response;
}
export async function getProductsDetails({queries}) {
  let header = {
    "Content-Type": "application/json; charset=UTF-8",
    // "Access-Control-Allow-Origin": "*",
    // letscms_token: JSON.parse(await Global.getToken()),
  };

  const response = await shopAPi(`${ApiEndpoints.PRODUCT}/${queries}`, null, "GET", null, false, header);
  return response;
}
export async function getFeaturedCategories() {
  let header = {
    "Content-Type": "application/json; charset=UTF-8",
    // "Access-Control-Allow-Origin": "*",
    // letscms_token: JSON.parse(await Global.getToken()),
  };

  const response = await shopAPi(ApiEndpoints.PRODUCT_CATEGORIES, null, "GET", null, false, header);
  return response;
}
