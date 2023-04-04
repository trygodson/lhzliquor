import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_STORAGE_ITEM = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};
export const GET_STORAGE_ITEM = async (key) => {
  return JSON.parse(await AsyncStorage.getItem(key));
};
export const DELETE_STORAGE_ITEM = async (key) => {
  return JSON.parse(await AsyncStorage.removeItem(key));
};
export const CLEAR_STORAGE = async () => {
  await AsyncStorage.clear();
};
