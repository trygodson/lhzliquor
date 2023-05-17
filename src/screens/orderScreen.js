import {
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import {CustomHeader2, Loader2} from "../components/common";
import {mdscale, vtscale} from "../utils/pixelRatio";
import {fonts} from "../utils/constants";
import AppColors from "../utils/ColorApp";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterOrdersAction, getOrdersAction} from "../store/slices/orders/orders";
import OrderImage from "../components/orders/orderImage";
import DropShadow from "react-native-drop-shadow";
import {useNavigation} from "@react-navigation/native";

const OrderScreen = () => {
  const [tabs, setTabs] = useState(1);
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {loading, response2: response} = useSelector((state) => state.getOrders);
  useEffect(() => {
    dispatch(getOrdersAction());
  }, []);

  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 title={"Orders"} />

        {loading ? (
          <View style={{height: height * 0.65, width, justifyContent: "center", alignItems: "center"}}>
            <Loader2 />
          </View>
        ) : (
          <View style={{}}>
            <View
              style={{
                width: "100%",
                justifyContent: "space-around",
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <Pressable
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: tabs === 1 ? AppColors.appGreen : "transparent",
                }}
                onPress={() => {
                  setTabs(1);
                  dispatch(filterOrdersAction("all"));
                }}
              >
                <Text
                  style={{
                    color: tabs === 1 ? AppColors.white : AppColors.black,
                    fontSize: 15,
                    fontFamily: fonts.SemiBold,
                  }}
                >
                  All
                </Text>
              </Pressable>
              <Pressable
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: tabs === 2 ? AppColors.appGreen : "transparent",
                }}
                onPress={() => {
                  setTabs(2);
                  dispatch(filterOrdersAction("completed"));
                }}
              >
                <Text
                  style={{
                    color: tabs === 2 ? AppColors.white : AppColors.black,
                    fontSize: 15,
                    fontFamily: fonts.SemiBold,
                  }}
                >
                  Completed
                </Text>
              </Pressable>
              <Pressable
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: tabs === 3 ? AppColors.appGreen : "transparent",
                }}
                onPress={() => {
                  dispatch(filterOrdersAction("cancelled"));
                  setTabs(3);
                }}
              >
                <Text
                  style={{
                    color: tabs === 3 ? AppColors.white : AppColors.black,
                    fontSize: 15,
                    fontFamily: fonts.SemiBold,
                  }}
                >
                  Cancelled
                </Text>
              </Pressable>
            </View>

            <View style={{paddingHorizontal: 7, marginBottom: height * 0.3}}>
              <FlatList
                data={response ?? []}
                style={{}}
                keyExtractor={(item) => item?.order_id}
                renderItem={({index, item}) => (
                  <DropShadow
                    style={{
                      shadowColor: "#cccccc",
                      shadowOffset: {width: 0, height: 3},
                      shadowOpacity: 0.3,
                      shadowRadius: 2,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        // width: "100%",
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        paddingRight: 20,
                        marginBottom: 15,
                        backgroundColor: "white",
                        borderRadius: 5,
                      }}
                    >
                      <OrderImage id={item?.order_id} />

                      <View style={{justifyContent: "space-evenly", width: "60%"}}>
                        {item?.items.map((it, i) => (
                          <View style={{flexDirection: "row"}} key={i}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: fonts.Regular,
                                color: AppColors.black,
                                flexWrap: "wrap",
                              }}
                            >
                              {it?.item_name}
                            </Text>
                            <Text style={{fontSize: 14, fontFamily: fonts.Bold, color: AppColors.black}}>
                              {" "}
                              x {it?.quantity}
                            </Text>
                          </View>
                        ))}

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                          <Text
                            style={{
                              color: AppColors.black,
                              fontFamily: fonts.ExtraBold,
                              fontSize: 22,
                              marginVertical: 15,
                            }}
                          >
                            {item?.total}
                          </Text>

                          <Text
                            style={{
                              color:
                                item?.order_status === "processing"
                                  ? "blue"
                                  : item?.order_status === "cancelled"
                                  ? "red"
                                  : "green",
                              fontSize: 17,
                              marginLeft: 20,
                              fontFamily: fonts.Bold,
                            }}
                          >
                            {item?.order_status}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => navigate("OrderDetails", {id: item?.order_id})}
                          style={{
                            color: "white",
                            borderWidth: 1,
                            borderColor: AppColors.black,
                            paddingVertical: 10,
                            paddingHorizontal: 18,
                            borderRadius: 4,
                          }}
                        >
                          <Text style={{color: "black", fontSize: 14, textAlign: "center"}}>View Details</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </DropShadow>
                )}
                ListEmptyComponent={
                  <View style={{justifyContent: "center", alignItems: "center", width: width, height: height * 0.4}}>
                    <Text style={{fontSize: 21, fontFamily: fonts.SemiBold, color: AppColors.black}}>
                      No Orders Available
                    </Text>
                  </View>
                }
              />
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

export {OrderScreen};
