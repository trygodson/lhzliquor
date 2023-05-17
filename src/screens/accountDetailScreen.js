import {
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import {CustomHeader2, Signuppop} from "../components/common";
import {mdscale, vtscale} from "../utils/pixelRatio";
import Signout from "../assets/icons/Signout.svg";
import Job from "../assets/icons/Job.svg";
import Address from "../assets/icons/address.svg";
import Person from "../assets/icons/sPerson2.svg";
import {fonts} from "../utils/constants";
import AppColors from "../utils/ColorApp";
import {CommonActions, StackActions, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {navigationRef} from "../Main";
import {useSelector} from "react-redux";

const AccountDetailScreen = () => {
  const {navigate} = useNavigation();
  const {height, width} = useWindowDimensions();
  const {response, loading} = useSelector((state) => state.userAddress);
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 title={"Profile"} />
        <ScrollView style={{paddingHorizontal: 10, paddingVertical: 14}}>
          <>
            <View
              style={{
                backgroundColor: AppColors.mainBG,
                height: 230,
                width: "100%",
                overflow: "hidden",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  height: 200,
                  position: "absolute",
                  top: "-26%",

                  width: "100%",
                  // borderRadius: 200,
                  // transform: [{scaleX: 1.5}],
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              ></View>
              <View style={{position: "relative", zIndex: 3, alignSelf: "center", alignItems: "center"}}>
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontSize: 28,
                    color: AppColors.black,
                    fontFamily: fonts.Bold,
                    marginVertical: 10,
                    flexWrap: "wrap",
                    textAlign: "center",
                  }}
                >
                  {response?.first_name} {response?.last_name}
                </Text>
              </View>

              <View style={{paddingHorizontal: 20}}>
                <View style={{marginVertical: 10}}>
                  <Text style={{fontSize: 13, color: AppColors.black}}>Mobile Number</Text>
                  <Text style={{fontSize: 19, fontFamily: fonts.Bold, color: AppColors.black}}>
                    {response?.phone ?? ""}
                  </Text>
                </View>
                <View style={{marginVertical: 10}}>
                  <Text style={{fontSize: 13, color: AppColors.black}}>Email</Text>
                  <Text style={{fontSize: 19, fontFamily: fonts.Bold, color: AppColors.black}}>
                    {response?.email ?? ""}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: AppColors.mainBG,
                width: "100%",
                paddingVertical: 30,
                paddingHorizontal: 20,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  fontSize: 27,
                  color: AppColors.appGreen,
                  fontFamily: fonts.Bold,
                  marginVertical: 10,
                  textAlign: "center",
                }}
              >
                Address
              </Text>
              <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 13, color: AppColors.black}}>Postal Code</Text>
                <Text style={{fontSize: 19, fontFamily: fonts.SemiBold, color: AppColors.black}}>
                  {response?.postcode ?? ""}
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 13, color: AppColors.black}}>Address</Text>
                <Text style={{fontSize: 19, fontFamily: fonts.SemiBold, color: AppColors.black}}>
                  {response?.address_1 ?? ""} {response?.address_2 ?? ""}
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 13, color: AppColors.black}}>City</Text>
                <Text style={{fontSize: 19, fontFamily: fonts.SemiBold, color: AppColors.black}}>
                  {response?.city ?? ""}
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 13, color: AppColors.black}}>State</Text>
                <Text style={{fontSize: 19, fontFamily: fonts.SemiBold, color: AppColors.black}}>
                  {response?.state ?? ""}
                </Text>
              </View>
            </View>
          </>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export {AccountDetailScreen};
