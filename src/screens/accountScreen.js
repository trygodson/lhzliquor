import {
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from "react-native";
import {CustomHeader2, Loader2, Signuppop} from "../components/common";
import {mdscale, vtscale} from "../utils/pixelRatio";
import Signout from "../assets/icons/Signout.svg";
import Job from "../assets/icons/Job.svg";
import Address from "../assets/icons/address.svg";
import Person from "../assets/icons/sPerson2.svg";
import DelPerson from "../assets/icons/acctDelete.svg";
import {fonts} from "../utils/constants";
import AppColors from "../utils/ColorApp";
import {CommonActions, StackActions, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {navigationRef} from "../Main";
import {useDispatch, useSelector} from "react-redux";
import {deleteAccountService} from "../services/auth";
import {useState} from "react";
import {setLogin} from "../store/slices/auth/loginSlice";
const AccountScreen = () => {
  const dispatch = useDispatch();
  const {navigate, reset} = useNavigation();
  const [loading, setLoading] = useState(false);
  const {LOGIN} = useSelector((state) => state.login);
  const {response} = useSelector((state) => state.userAddress);
  const {width, height} = useWindowDimensions();
  const signout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(setLogin(false));

      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: "LoginScreen"}],
        })
      );
    } catch (error) {}
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are You Sure You Want to Delete Account",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "",
        },
        {
          text: "Delete",
          onPress: async () => {
            // setLoading(true);
            await handleDeleteAccount();
          },
        },
      ],
      {cancelable: true}
    );
  };
  const handleDeleteAccount = async () => {
    setLoading(true);
    deleteAccountService({email: response?.email})
      .then(async (res) => {
        console.log(res, "------res-----");
        await signout();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        alert("Unable To Delete Account");
        console.log(err);
      });
  };

  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 />
        {!LOGIN ? (
          <View>
            <Signuppop />
          </View>
        ) : loading ? (
          <View style={{height: height * 0.8, width: width, justifyContent: "center", alignItems: "center"}}>
            <Loader2 />
          </View>
        ) : (
          <View style={{justifyContent: "space-between", flex: 1}}>
            <View style={{marginTop: 50, zIndex: 3, alignSelf: "center", alignItems: "center"}}>
              <Text
                style={{
                  textTransform: "uppercase",
                  fontSize: 16,
                  color: AppColors.black,
                  fontFamily: fonts.SemiBold,
                  flexWrap: "wrap",
                  textAlign: "center",
                }}
              >
                Hello
              </Text>
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

            <View style={{backgroundColor: "white", paddingTop: 15}}>
              <Pressable onPress={() => navigate("OrderScreen")} style={styles.listItems}>
                <View style={styles.IconTextView}>
                  <Job width={25} height={25} />
                  <Text style={styles.listItemTexts}>Orders</Text>
                </View>
              </Pressable>

              {/* <Pressable onPress={() => {}} style={styles.listItems}>
                <View style={styles.IconTextView}>
                  <Address width={25} height={25} />

                  <Text style={styles.listItemTexts}>Address</Text>
                </View>
              </Pressable> */}

              <Pressable style={styles.listItems} onPress={() => navigate("AccountDetailScreen")}>
                <View style={styles.IconTextView}>
                  <Person width={25} height={25} />
                  <Text style={styles.listItemTexts}>Account Details</Text>
                </View>
                {/* <Image source={require("@Assets/flatlistrightarrow.png")} style={styles.rightflatIcon} /> */}
              </Pressable>
              <Pressable style={styles.listItems} onPress={() => deleteAccount()}>
                <View style={styles.IconTextView}>
                  <DelPerson width={25} height={25} />
                  <Text style={styles.listItemTexts}>Delete Account</Text>
                </View>
                {/* <Image source={require("@Assets/flatlistrightarrow.png")} style={styles.rightflatIcon} /> */}
              </Pressable>

              {/* <Pressable style={styles.listItems} onPress={() => {}}>
            <View style={styles.IconTextView}>
              <Notofication width={25} height={25} />
              <Text style={styles.listItemTexts}>Notifications</Text>
            </View>
            <Image source={require("@Assets/flatlistrightarrow.png")} style={styles.rightflatIcon} />
          </Pressable> */}

              <Pressable style={styles.signOutSettingsList}>
                <TouchableOpacity
                  onPress={async () => {
                    signout();
                  }}
                  style={styles.IconTextView}
                >
                  <Signout width={25} height={25} />
                  <Text style={styles.listItemTexts}>Logout</Text>
                </TouchableOpacity>
                {/* <Image source={require("@Assets/flatlistrightarrow.png")} style={styles.rightflatIcon} /> */}
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    // backgroundColor: colors.
  },

  profileImage: {
    width: mdscale(59),
    height: vtscale(68),
    borderRadius: mdscale(4),
    marginRight: mdscale(10),
    backgroundColor: "grey",
  },

  profileImageNameView: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerProfileImagePannel: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: mdscale(16),
    paddingVertical: mdscale(16),
    marginBottom: mdscale(5),
  },

  accountRightIcon: {
    height: vtscale(19),
    width: mdscale(12),
    resizeMode: "contain",
  },

  companyNameText: {
    fontSize: mdscale(16),
    fontFamily: fonts.Bold,
    color: "black",
    // fontWeight:'bold'
  },

  domainEmailText: {
    fontSize: mdscale(12),
    fontFamily: fonts.Regular,
    color: "#757F8C",
  },

  listItemTexts: {
    fontSize: mdscale(14),
    fontFamily: fonts.Regular,
    color: "black",
    marginLeft: 10,
  },

  listItems: {
    flexDirection: "row",
    height: vtscale(56),
    backgroundColor: "white",
    paddingHorizontal: mdscale(16),
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: mdscale(5)
  },

  signOutSettingsList: {
    flexDirection: "row",
    height: vtscale(56),
    backgroundColor: "white",
    paddingHorizontal: mdscale(16),
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: mdscale(10),
  },

  rightArrowIcon: {
    fontSize: mdscale(18),
    color: AppColors.appGreen,
  },

  righIcon: {
    fontSize: mdscale(18),
    flexDirection: "row",
    alignItems: "flex-end",
    color: "#757F8C",
  },

  icons: {
    height: vtscale(20),
    width: mdscale(20),
    resizeMode: "contain",
    marginRight: mdscale(13),
    tintColor: AppColors.appGreen,
  },

  IconTextView: {
    flexDirection: "row",
  },

  rightflatIcon: {
    height: vtscale(11),
    width: mdscale(6),
    // resizeMode:'contain'
  },
});

export {AccountScreen};
