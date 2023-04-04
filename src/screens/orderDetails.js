import CheckBox from "@react-native-community/checkbox";
import {useNavigation} from "@react-navigation/native";
import moment from "moment";
import {useEffect, useState} from "react";
import {ScrollView, View, Text, TouchableOpacity, Image, useWindowDimensions, Keyboard} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {CustomHeader2, Loader2} from "../components/common";
import {CustomDropDownCountry, TheTextInput} from "../components/common/textInput";
import {OrderDetailImage} from "../components/orders/orderDetailsImage";
import {orderDetails} from "../services/orders";
import {getPaymentGatewayAction} from "../store/slices/cart/paymentGateways";
import AppColors from "../utils/ColorApp";
import {fonts} from "../utils/constants";
import {countryList} from "../utils/others";
import {customToast} from "../utils/toast";

const OrderDetails = ({route}) => {
  const {navigate} = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    (function () {
      setLoading(true);
      orderDetails(route.params?.id)
        .then((res) => {
          setLoading(false);
          if (res.status === true) {
            setData(res?.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          customToast("Error Getting Order Details");
        });
    })();
  }, []);
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 title={"Order Details"} shoppingBag={false} />
        <ScrollView style={{paddingHorizontal: 10, paddingTop: 20}}>
          {loading ? (
            <Loader2 />
          ) : (
            <>
              <View>
                <View>
                  <View style={{padding: 20, marginBottom: 40, marginTop: 40, backgroundColor: "#f7f7f7"}}>
                    {data && <OrderDetailImage items={data?.items} />}
                    {/* <Text
                      style={{
                        fontSize: 27,
                        textAlign: "center",
                        fontFamily: fonts.SemiBold,
                        color: AppColors.black,
                        marginBottom: 10,
                      }}
                    >
                      ORDER DETAILS
                    </Text> */}

                    <View
                      style={{
                        backgroundColor: "white",
                        padding: 13,
                        paddingVertical: 15,
                        borderRadius: 8,
                        marginBottom: 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottomColor: "#cccccc",
                          borderBottomWidth: 1,
                          borderStyle: "dashed",
                          paddingBottom: 7,
                          marginBottom: 7,
                        }}
                      >
                        <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Bold}}>Products</Text>
                        <Text style={{fontSize: 16, color: AppColors.appGreen, fontFamily: fonts.Medium}}>
                          SubTotal
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: "#cccccc",
                          borderBottomWidth: 1,
                          borderStyle: "dashed",
                          paddingBottom: 7,
                          marginBottom: 7,
                        }}
                      >
                        {data &&
                          data?.items.length > 0 &&
                          data?.items.map((item) => {
                            return (
                              <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 4}}>
                                <View style={{flexDirection: "row"}}>
                                  <Text
                                    style={{fontSize: 15, color: "#333333", fontFamily: fonts.Light, marginRight: 5}}
                                  >
                                    {item?.name}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      color: AppColors.appGreen,
                                      fontFamily: fonts.Regular,
                                      marginRight: 15,
                                    }}
                                  >
                                    x{item?.quantity}
                                  </Text>
                                </View>
                                <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Light}}>
                                  ${item?.total}
                                </Text>
                              </View>
                            );
                          })}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottomColor: "#cccccc",
                          borderBottomWidth: 1,
                          borderStyle: "dashed",
                          paddingBottom: 7,
                          marginBottom: 7,
                        }}
                      >
                        <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Bold}}>Subtotal</Text>
                        <Text style={{fontSize: 16, color: AppColors.appGreen, fontFamily: fonts.Medium}}>
                          ${data?.subtotal}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottomColor: "#cccccc",
                          borderBottomWidth: 1,
                          borderStyle: "dashed",
                          paddingBottom: 7,
                          marginBottom: 7,
                        }}
                      >
                        <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Bold}}>Order Status</Text>
                        <Text style={{fontSize: 16, color: "green", fontFamily: fonts.Medium}}>{data?.status}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottomColor: "#cccccc",
                          borderBottomWidth: 1,
                          borderStyle: "dashed",
                          paddingBottom: 7,
                          marginBottom: 7,
                        }}
                      >
                        <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Bold}}>Order Number</Text>
                        <Text style={{fontSize: 16, color: AppColors.black, fontFamily: fonts.Medium}}>
                          {data?.number}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottomColor: "#cccccc",
                          borderBottomWidth: 1,
                          borderStyle: "dashed",
                          paddingBottom: 7,
                          marginBottom: 7,
                        }}
                      >
                        <Text style={{fontSize: 17, color: AppColors.black, fontFamily: fonts.Bold}}>Shipping</Text>
                        <View style={{alignItems: "flex-end"}}>
                          <View style={{flexDirection: "row", alignItems: "center"}}>
                            {/* <Text
                              style={{
                                fontSize: 15,
                                color: AppColors.lightGray,
                                fontFamily: fonts.Medium,
                                marginRight: 5,
                                fontStyle: "italic",
                              }}
                            >
                              {data?.shipping?.first_name} {data?.shipping?.last_name}
                            </Text> */}

                            <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Light}}>
                              ${data?.shipping_total}
                            </Text>
                          </View>
                          <View style={{flexDirection: "row", alignItems: "center"}}></View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottomColor: "#cccccc",
                          borderBottomWidth: 1,
                          borderStyle: "dashed",
                          paddingBottom: 7,
                          marginBottom: 7,
                        }}
                      >
                        <Text style={{fontSize: 17, color: AppColors.black, fontFamily: fonts.Bold}}>Date</Text>
                        <View style={{alignItems: "flex-end"}}>
                          <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text
                              style={{
                                fontSize: 15,
                                color: AppColors.lightGray,
                                fontFamily: fonts.Medium,
                                marginRight: 5,
                                fontStyle: "italic",
                              }}
                            >
                              {moment(data?.date_created?.date).format("ll")}
                            </Text>
                          </View>
                          <View style={{flexDirection: "row", alignItems: "center"}}></View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottomColor: "#cccccc",
                          borderBottomWidth: 1,
                          borderStyle: "dashed",
                          paddingBottom: 7,
                          marginBottom: 7,
                        }}
                      >
                        <Text style={{fontSize: 17, color: AppColors.black, fontFamily: fonts.Bold}}>
                          Payment Method
                        </Text>
                        <View style={{alignItems: "flex-end"}}>
                          <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text
                              style={{
                                fontSize: 15,
                                color: AppColors.lightGray,
                                fontFamily: fonts.Medium,
                                marginRight: 5,
                                fontStyle: "italic",
                              }}
                            >
                              {data?.payment_method_title}
                            </Text>
                          </View>
                          <View style={{flexDirection: "row", alignItems: "center"}}></View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingVertical: 14,
                          marginBottom: 7,
                        }}
                      >
                        <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Bold}}>Total</Text>
                        <Text style={{fontSize: 16, color: AppColors.appGreen, fontFamily: fonts.Medium}}>
                          ${data?.total}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => navigate("ShopScreen")}>
                      <View
                        style={{
                          flex: 1,
                          height: 40,
                          backgroundColor: AppColors.appGreen,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 14,
                        }}
                      >
                        <Text style={{color: "white", fontSize: 17, fontFamily: fonts.SemiBold}}>Shop More</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export {OrderDetails};
