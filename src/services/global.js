import AsyncStorage from "@react-native-async-storage/async-storage";

class Global {}

Global.getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export default Global;
