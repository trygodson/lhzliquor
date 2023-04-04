import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {ScrollView, View, Text, TouchableOpacity, Keyboard, useWindowDimensions} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {EachItem} from "../components/cart/eachItem";
import {CustomHeader2, Loader2, Signuppop} from "../components/common";
import {getTotal} from "../store/slices/cart/cart";
import AppColors from "../utils/ColorApp";
import Emptycart from "../assets/icons/emptycart1.svg";
import {fonts} from "../utils/constants";
import {addCouponService, getCart} from "../services/cart";
import {customToast} from "../utils/toast";
import {TheTextInput} from "../components/common/textInput";

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState("loading");
  const {LOGIN} = useSelector((state) => state.login);
  const [couponInput, setCouponInput] = useState("");
  const {width, height} = useWindowDimensions();
  const {navigate} = useNavigation();
  const onDismiss = () => {
    Keyboard.dismiss;
  };

  const fetchCart = () => {
    setLoading("loading");
    getCart()
      .then((res) => {
        console.log(res, "------- cart details ------");
        setLoading(false);
        if (res.status === true) {
          setData(res.data);
        } else {
          setData([]);
          customToast(res?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error retrieving cart");
        customToast("error retrieving cart");
      });
  };

  const addCoupon = () => {
    if (couponInput === null || couponInput === "") {
      customToast("Input Your Coupon Code");
    } else {
      setLoading(true);
      addCouponService(couponInput)
        .then((res) => {
          setLoading(false);
          if (res?.status === true) {
            setData(res.data);
            if (res?.coupon_status === false) {
              customToast("Coupon Error " + JSON.stringify(res.coupon_errors[couponInput]));
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          customToast("Coupon Error " + JSON.stringify(err));
        });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      fetchCart();
    });
    return unsubscribe;
  }, []);
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 title={"Shopping Cart"} shoppingBag={false} />
        <ScrollView style={{paddingHorizontal: 10, paddingTop: 20}}>
          {!LOGIN ? (
            <View>
              <Signuppop />
            </View>
          ) : loading ? (
            <View style={{height: height * 0.8, width: width, justifyContent: "center", alignItems: "center"}}>
              <Loader2 />
            </View>
          ) : data && data?.cart_items?.length > 0 ? (
            <>
              {data?.cart_items?.map((item, index) => {
                return <EachItem item={item} key={index} fetchCart={fetchCart} />;
              })}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 4,
                }}
              >
                <View style={{width: "64%"}}>
                  <TheTextInput
                    label={"Coupon code"}
                    onChangeText={(e) => setCouponInput(e)}
                    customStyle={{marginTop: 0}}
                    text={couponInput}
                    validate={true}
                    multiValidateMode={true}
                    onSubmitEditing={onDismiss}
                    icon={false}
                    onBlur={(v) => console.log(v)}
                    // preicon={EmailIcon}
                  />
                </View>
                <View style={{width: "32%", marginBottom: 5}}>
                  <TouchableOpacity
                    style={{backgroundColor: AppColors.appGreen, borderRadius: 5, height: 50, justifyContent: "center"}}
                    onPress={() => addCoupon()}
                  >
                    <Text style={{color: "white", fontSize: 14, fontFamily: fonts.SemiBold, textAlign: "center"}}>
                      Add Coupon
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{padding: 20, borderColor: "#cccccc", borderWidth: 1, marginBottom: 40}}>
                <Text style={{fontSize: 30, fontFamily: fonts.SemiBold, color: AppColors.black, marginBottom: 10}}>
                  Cart Total
                </Text>
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
                  <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Bold}}>Cart Total</Text>
                  <Text style={{fontSize: 16, color: AppColors.appGreen, fontFamily: fonts.Medium}}>
                    ${data?.cart_totals?.cart_contents_total}
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
                  <Text style={{fontSize: 17, color: AppColors.black, fontFamily: fonts.Bold}}>Shipping Fee</Text>
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
                        ${data?.cart_totals?.shipping_total}
                      </Text>
                    </View>
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
                  <Text style={{fontSize: 17, color: AppColors.black, fontFamily: fonts.Bold}}>Tax Fee</Text>
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
                        ${data?.cart_totals?.total_tax}
                      </Text>
                    </View>
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
                  <Text style={{fontSize: 17, color: AppColors.black, fontFamily: fonts.Bold}}>Coupon Discounts</Text>
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
                        ${data?.cart_totals?.discount_total}
                      </Text>
                    </View>
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
                    ${data?.cart_totals?.total}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => navigate("CheckOutScreen", {data: data, coupon: couponInput})}>
                  <View
                    style={{
                      flex: 1,
                      height: 40,
                      backgroundColor: AppColors.appGreen,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{color: "white", fontSize: 17, fontFamily: fonts.SemiBold}}>Procced To Checkout</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={{justifyContent: "center", alignItems: "center", width, height: height * 0.67}}>
              <Emptycart />
              <Text style={{fontSize: 20, fontFamily: fonts.SemiBold, color: AppColors.black}}>No Items In Cart</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export {CartScreen};
