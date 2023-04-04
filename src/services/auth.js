import {ApiEndpoints} from "../utils/endPoints";
import shopAPi from "../utils/shopApi";

export async function LogInUser(payload) {
  let header = {};

  try {
    const response = await shopAPi(ApiEndpoints.LOGIN, null, "POST", payload, false, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function SignUpUser(payload) {
  let header = {};

  try {
    const response = await shopAPi(ApiEndpoints.SIGNUP, null, "POST", payload, false, header);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function ResetPasswordService(payload) {
  let header = {};

  try {
    const response = await shopAPi(ApiEndpoints.FORGETPASSWORD, null, "POST", payload, false, header);
    return response;
  } catch (error) {
    throw error;
  }
}
