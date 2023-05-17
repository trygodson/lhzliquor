// export const SHOP_BASE_URL = "https://lhzliquor.com/wp-json/wc/v3/";
export const SHOP_BASE_URL = "https://lhzliquor.com/wp-json/letscms/v1/";
export const thekeys =
  "?consumer_key=ck_8a6759cff0068cfdbb1c96b571ea6a022af8c767&consumer_secret=cs_1dc57635c1e20f070c7d38547fbb98c6ebbe6ea3";
export const ApiEndpoints = {
  //Application Data
  LOGIN: "auth/login",
  SIGNUP: "auth/register",
  FORGETPASSWORD: "auth/forgot-password",
  DELETACCOUNT: "auth/user",
  // LOGIN: "/login",
  // SIGNUP: "/sign_up",

  //apply Visa
  PRODUCTS: "products",
  PRODUCT: "product",
  PAYMENT_GATEWAYS: "payment_gateways",
  ORDERS: "orders",
  PRODUCT_CATEGORIES: "categories",

  ADDTOCART: "cart/add-item",
  CARTCOUNT: "cart/count",
  CART: "cart",
  UPDATEQUANTITY: "cart/update-quantities",
  REMOVE: "cart/remove-item/",
  ADDCOUPON: "cart?coupons[]=",

  //checkout
  CHECKOUT: "checkout?coupons[]=",
  SHIPPING: "address/billing",
  CREATEORDER: "order/create",
  PAYMENTINTENTS: "paymentintents",

  //orders
  ORDER: "order/",

  //User Address
  USER_ADDRESS: "address/billing",
};
