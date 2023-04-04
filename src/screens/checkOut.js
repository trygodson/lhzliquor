import CheckBox from "@react-native-community/checkbox";
import {CommonActions, StackActions, useNavigation} from "@react-navigation/native";
// import {useStripe} from "@stripe/stripe-react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import {useState, useEffect} from "react";
import {ScrollView, View, Text, TouchableOpacity, Image, useWindowDimensions, Keyboard} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {CustomHeader2, Loader2} from "../components/common";
import {CustomDropDownCountry, TheTextInput, TheTextPhoneInput} from "../components/common/textInput";
import {createOrderAction} from "../store/slices/cart/createOrder";
import {getPaymentGatewayAction} from "../store/slices/cart/paymentGateways";
import AppColors from "../utils/ColorApp";
import {fonts} from "../utils/constants";
import {countryList} from "../utils/others";
import {customToast} from "../utils/toast";
import Stripe from "react-native-stripe-api";
import {checkOutService, createOrderService, getAddressService} from "../services/checkout";
import {changeLoading} from "../store/slices/loader/loader";
import {navigationRef} from "../Main";
import {cartCountAction} from "../store/slices/cart/cartcountSlice";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First Name Required")
    .matches(/^\S*$/, "No Spaces")
    .min(3, "3 characters above long"),
  last_name: Yup.string()
    .required("First Name Required")
    .matches(/^\S*$/, "No Spaces")
    .min(3, "3 characters above long"),
  email: Yup.string().email("Invalid email address").required("Email is Required"),
  address_1: Yup.string().required("Address  is required"),
  address_2: Yup.string().required("Address 2 is required"),
  city: Yup.string().required("city is required"),
  state: Yup.string().required("State is required"),
  postcode: Yup.string().required("postcode is required"),
  country: Yup.string().required("country is required"),
  phone: Yup.string().required("phone is required"),
  payment_method: Yup.string().required("Payment Method is required"),
  payment_method_title: Yup.string().required("Payment Method Title is required"),
});

const CheckOutScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const {navigate} = useNavigation();
  const [stripeKey, setStripeKey] = useState();
  const dispatch = useDispatch();
  const [cartItem, setcartItem] = useState();
  const [cartTotal, setCartTotal] = useState();
  const [cardDetails, setCardDetails] = useState({
    number: "",
    cvc: "",
    exp_month: "",
    exp_year: "",
  });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    email: "",
    phone: "",
    payment_method: "",
    payment_method_title: "",
  });
  const [shipping, setShipping] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  const [countryData, setCountryData] = useState(
    countryList.map((item) => ({label: item.name, value: item?.sortname}))
  );
  const [countryData2, setCountryData2] = useState(
    countryList.map((item) => ({label: item.name, value: item?.sortname}))
  );
  const [thePaymentMethod, setthePaymentMethod] = useState();
  const [phoneCode, setPhoneCode] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  // const [lineItems, setLineItems] = useState(cart.map((item) => ({product_id: item.id, quantity: item.quantity})));
  // const [shippingLines, setShippingLines] = useState({
  //   method_id: "flat_rate",
  //   method_title: "Flat rate",
  //   total: "10.00",
  // });

  const [methodType, setMethodType] = useState({
    bankTransfer: false,
    check: false,
    cod: false,
    stripe: false,
  });
  const onDismiss = () => {
    Keyboard.dismiss;
  };

  const {width, height} = useWindowDimensions();

  const createOrder = (v) => {
    if (v?.payment_method === "stripe") {
      if (
        cardDetails.number === "" ||
        cardDetails.cvc === "" ||
        cardDetails.exp_month === "" ||
        cardDetails.exp_year === ""
      ) {
        customToast("Please complete Card Fields");
      } else {
        dispatch(changeLoading(true));
        const client = new Stripe(stripeKey);
        client
          .createToken({
            number: cardDetails.number,
            exp_month: cardDetails.exp_month,
            exp_year: cardDetails.exp_year,
            cvc: cardDetails.cvc,
            address_line1: v.address_1,
            address_line2: v.address_2,
            address_city: v.city,
            address_state: v.state,
            address_zip: v.phone,
            address_country: v.country,
          })
          .then((tk) => {
            console.log(tk, "----stripe token -----");
            if (Object.keys(tk)[0] != "error") {
              console.log(
                {...v, stripe_card_token: tk?.id, coupons: route.params.coupon},
                "------object for create order---"
              );
              createOrderService({...v, stripe_card_token: tk?.id, coupons: route.params.coupon})
                .then((res) => {
                  console.log(res, "------create order from stripe response-----");
                  dispatch(changeLoading(false));

                  if (res.status === true) {
                    dispatch(cartCountAction());
                    navigationRef.dispatch(StackActions.replace("SuccessScreen", {id: res?.data?.order_id}));
                  } else {
                    alert(JSON.stringify(res.errors));
                  }
                })
                .catch((err) => {
                  console.log(err, "---create order error----");
                  dispatch(changeLoading(false));
                  alert(JSON.stringify(err));
                });
            } else {
              dispatch(changeLoading(false));

              alert(tk?.error?.message);
            }
          })
          .catch((err) => {
            alert(JSON.stringify(err));
            dispatch(changeLoading(false));

            console.log(err, "------stripe token error----");
          });
      }
    } else if (v?.payment_method === "cod") {
      dispatch(changeLoading(true));
      createOrderService({...v, coupons: route.params.coupon})
        .then((res) => {
          dispatch(changeLoading(false));
          if (res.status === true) {
            dispatch(cartCountAction());
            // navigationRef.dispatch(
            //   CommonActions.reset({
            //     index: 1,
            //     routes: [{name: "SuccessScreen", params: {id: res?.data?.order_id}}],
            //     // actions: [navigation.navigate("SuccessScreen", {id: res?.data?.order_id})],
            //   })
            // );
            navigationRef.dispatch(StackActions.replace("SuccessScreen", {id: res?.data?.order_id}));
          }
        })
        .catch((err) => {
          dispatch(changeLoading(false));
          console.log(err);
        });
    }
  };
  const fetchCheckOut = () => {
    setLoading(true);
    checkOutService()
      .then((res) => {
        setLoading(false);
        console.log(res, "-------res from checkourt-----");
        if (res.status === true) {
          setFormData((prev) => ({
            ...prev,
            address_1: res?.data?.customer?.address_1,
            address_2: res?.data?.customer?.address_2,
            city: res?.data?.customer?.city,
            country: res?.data?.customer?.country,
            email: res?.data?.customer?.email,
            first_name: res?.data?.customer?.first_name,
            last_name: res?.data?.customer?.last_name,
            phone: res?.data?.customer?.phone,
            postcode: res?.data?.customer?.postcode,
            state: res?.data?.customer?.state,
          }));
          setcartItem(res?.data?.cart_items);
          setCartTotal(res?.data?.cart_totals);
          setthePaymentMethod(Object.keys(res?.data?.payment_gateways ?? {}));
          if (res?.data?.payment_gateways?.stripe) {
            setStripeKey(res?.data?.payment_gateways?.stripe.test_secret_key);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "------err getting checkout------");
      });
  };

  useEffect(() => {
    fetchCheckOut();
  }, []);
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 title={"Check Out"} shoppingBag={false} />
        <ScrollView style={{paddingHorizontal: 10, paddingTop: 20}}>
          {loading ? (
            <Loader2 />
          ) : (
            <>
              <View>
                <View>
                  <Text
                    style={{fontSize: 18, fontFamily: fonts.ExtraBold, color: AppColors.appGreen, marginVertical: 5}}
                  >
                    BILLING DETAILS
                  </Text>
                  <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    validateOnBlur
                    initialValues={formData}
                    onSubmit={(v) => createOrder(v)}
                  >
                    {({
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      isSubmitting,
                      isValid,
                    }) => {
                      return (
                        <>
                          <TheTextInput
                            label={"First Name"}
                            onChangeText={handleChange("first_name")}
                            onBlur={handleBlur("first_name")}
                            customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                            text={values.first_name}
                            validate={true}
                            multiValidateMode={true}
                            onSubmitEditing={onDismiss}
                            icon={false}
                            // preicon={EmailIcon}
                          />
                          <TheTextInput
                            label={"Last Name"}
                            onChangeText={handleChange("last_name")}
                            onBlur={handleBlur("last_name")}
                            customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                            text={values.last_name}
                            validate={true}
                            multiValidateMode={true}
                            onSubmitEditing={onDismiss}
                            icon={false}
                            // preicon={EmailIcon}
                          />
                          <TheTextInput
                            label={"Email"}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                            text={values.email}
                            validate={true}
                            multiValidateMode={true}
                            onSubmitEditing={onDismiss}
                            icon={false}
                            // preicon={EmailIcon}
                          />
                          <TheTextInput
                            label={"Address One"}
                            onChangeText={handleChange("address_1")}
                            onBlur={handleBlur("address_1")}
                            customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                            text={values.address_1}
                            validate={true}
                            multiValidateMode={true}
                            onSubmitEditing={onDismiss}
                            icon={false}
                            // preicon={EmailIcon}
                          />
                          <TheTextInput
                            label={"Address Two"}
                            onChangeText={handleChange("address_2")}
                            onBlur={handleBlur("address_2")}
                            customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                            text={values.address_2}
                            validate={true}
                            multiValidateMode={true}
                            onSubmitEditing={onDismiss}
                            icon={false}
                            // preicon={EmailIcon}
                          />
                          <CustomDropDownCountry
                            label={"Country*"}
                            items={countryData}
                            setItems={setCountryData}
                            setValue={(e) => {
                              setPhoneCode(countryList.filter((i) => i.sortname === e())[0].phonecode);

                              setFieldValue("country", e());
                            }}
                            // setValue={handleChange("country")}
                            value={values.country}
                            customPlaceHolderStyle={{fontSize: 14}}
                          />

                          <TheTextInput
                            label={"State"}
                            onChangeText={handleChange("state")}
                            onBlur={handleBlur("state")}
                            customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                            text={values.state}
                            validate={true}
                            multiValidateMode={true}
                            onSubmitEditing={onDismiss}
                            icon={false}
                            // preicon={EmailIcon}
                          />

                          <TheTextInput
                            label={"Town/City"}
                            onChangeText={handleChange("city")}
                            onBlur={handleBlur("city")}
                            customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                            text={values.city}
                            validate={true}
                            multiValidateMode={true}
                            onSubmitEditing={onDismiss}
                            icon={false}
                            // preicon={EmailIcon}
                          />
                          <TheTextInput
                            label={"PostCode *"}
                            onChangeText={handleChange("postcode")}
                            onBlur={handleBlur("postcode")}
                            customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                            text={values.postcode}
                            validate={true}
                            keyboardType={"numeric"}
                            multiValidateMode={true}
                            onSubmitEditing={onDismiss}
                            icon={false}
                            // preicon={EmailIcon}
                          />
                          <TheTextPhoneInput
                            label={"Phone"}
                            onChangeText={handleChange("phone")}
                            onBlur={handleBlur("phone")}
                            customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                            text={values.phone}
                            validate={true}
                            keyboardType={"numeric"}
                            multiValidateMode={true}
                            phoneCode={phoneCode}
                            onSubmitEditing={onDismiss}
                            icon={true}
                            // preicon={EmailIcon}
                          />

                          {cartItem && cartItem.length > 0 && (
                            <View style={{padding: 20, marginBottom: 40, backgroundColor: "#f7f7f7"}}>
                              <Text
                                style={{
                                  fontSize: 27,
                                  textAlign: "center",
                                  fontFamily: fonts.SemiBold,
                                  color: AppColors.black,
                                  marginBottom: 10,
                                }}
                              >
                                Your Order
                              </Text>

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
                                  <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Bold}}>
                                    Products
                                  </Text>
                                  <Text style={{fontSize: 16, color: AppColors.appGreen, fontFamily: fonts.Medium}}>
                                    SubTotal
                                  </Text>
                                </View>
                                {cartItem.map((item) => {
                                  return (
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
                                      key={item?.product_name}
                                    >
                                      <View style={{flexDirection: "row"}}>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: "#333333",
                                            fontFamily: fonts.Light,
                                            marginRight: 5,
                                          }}
                                        >
                                          {item?.product_name}
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
                                        ${item?.product_price}
                                      </Text>
                                    </View>
                                  );
                                })}
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
                                  <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Bold}}>
                                    Subtotal
                                  </Text>
                                  <Text style={{fontSize: 16, color: AppColors.appGreen, fontFamily: fonts.Medium}}>
                                    ${cartTotal?.subtotal}
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
                                  <Text style={{fontSize: 17, color: AppColors.black, fontFamily: fonts.Bold}}>
                                    Shipping
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
                                        {cartTotal?.shipping_total}
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
                                  <Text style={{fontSize: 15, color: AppColors.black, fontFamily: fonts.Bold}}>
                                    Total
                                  </Text>
                                  <Text style={{fontSize: 16, color: AppColors.appGreen, fontFamily: fonts.Medium}}>
                                    ${cartTotal?.total}
                                  </Text>
                                </View>
                              </View>

                              {thePaymentMethod &&
                                thePaymentMethod.length > 0 &&
                                thePaymentMethod.map((item, i) => {
                                  if (item === "cod") {
                                    return (
                                      <View style={{flexDirection: "row", alignItems: "center"}} key={i + "fkjnk"}>
                                        <CheckBox
                                          style={{color: AppColors.appGreen, marginRight: 10}}
                                          value={methodType.cod}
                                          tintColor={AppColors.appGreen}
                                          onCheckColor={AppColors.appGreen}
                                          tintColors={{false: AppColors.appGreen, true: AppColors.appGreen}}
                                          onValueChange={(newValue) => {
                                            if (newValue) {
                                              setFieldValue("payment_method", "cod");
                                              setFieldValue("payment_method_title", "Cash on Delivery");
                                              setPaymentMethod({
                                                payment_method: "cod",
                                                payment_method_title: "Cash on Delivery",
                                              });
                                              setMethodType((prev) => ({
                                                bankTransfer: false,
                                                check: false,
                                                cod: newValue,
                                                stripe: false,
                                              }));
                                            } else {
                                              setFieldValue("payment_method", "");
                                              setFieldValue("payment_method_title", "");

                                              setPaymentMethod(null);
                                              setMethodType((prev) => ({
                                                bankTransfer: false,
                                                check: false,
                                                cod: newValue,
                                                stripe: false,
                                              }));
                                            }
                                          }}
                                        />

                                        <Text style={{fontSize: 16, color: AppColors.black, fontFamily: fonts.Light}}>
                                          Cash on Delivery
                                        </Text>
                                      </View>
                                    );
                                  } else if (item === "stripe") {
                                    return (
                                      <View style={{flexDirection: "row", alignItems: "center"}} key={i + "fkjnk"}>
                                        <CheckBox
                                          style={{color: AppColors.appGreen, marginRight: 10}}
                                          value={methodType.stripe}
                                          tintColor={AppColors.appGreen}
                                          onCheckColor={AppColors.appGreen}
                                          tintColors={{false: AppColors.appGreen, true: AppColors.appGreen}}
                                          onValueChange={(newValue) => {
                                            if (newValue) {
                                              setFieldValue("payment_method", "stripe");
                                              setFieldValue("payment_method_title", "Credit Card (Stripe)");

                                              setPaymentMethod({
                                                payment_method: "Stripe",
                                                payment_method_title: "Credit Card (Stripe)",
                                              });
                                              setMethodType((prev) => ({
                                                bankTransfer: false,
                                                check: false,
                                                cod: false,
                                                stripe: newValue,
                                              }));
                                            } else {
                                              setPaymentMethod(null);
                                              setFieldValue("payment_method", "");
                                              setFieldValue("payment_method_title", "");

                                              setMethodType((prev) => ({
                                                bankTransfer: false,
                                                check: false,
                                                cod: false,
                                                stripe: newValue,
                                              }));
                                            }
                                          }}
                                        />

                                        <Text style={{fontSize: 16, color: AppColors.black, fontFamily: fonts.Light}}>
                                          Credit Card (Stripe)
                                        </Text>
                                      </View>
                                    );
                                  }
                                })}

                              {methodType.stripe && (
                                <View>
                                  <TheTextInput
                                    label={"Card Number"}
                                    onChangeText={(e) => setCardDetails((prev) => ({...prev, number: e}))}
                                    customStyle={{marginTop: 0, marginBottom: 10, marginTop: 10}}
                                    text={cardDetails.number}
                                    validate={true}
                                    onBlur={(v) => console.log(v)}
                                    keyboardType={"numeric"}
                                    multiValidateMode={true}
                                    onSubmitEditing={onDismiss}
                                    icon={false}
                                    maxLength={16}
                                    // preicon={EmailIcon}
                                  />

                                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <View style={{width: "45%"}}>
                                      <TheTextInput
                                        label={"Exp Month"}
                                        onChangeText={(e) => setCardDetails((prev) => ({...prev, exp_month: e}))}
                                        customStyle={{marginTop: 0, marginBottom: 10, marginTop: 10}}
                                        text={cardDetails.exp_month}
                                        validate={true}
                                        onBlur={(v) => console.log(v)}
                                        keyboardType={"numeric"}
                                        multiValidateMode={true}
                                        onSubmitEditing={onDismiss}
                                        icon={false}
                                        maxLength={2}

                                        // preicon={EmailIcon}
                                      />
                                    </View>
                                    <View style={{width: "45%"}}>
                                      <TheTextInput
                                        label={"Exp Year"}
                                        onChangeText={(e) => setCardDetails((prev) => ({...prev, exp_year: e}))}
                                        customStyle={{marginTop: 0, marginBottom: 10, marginTop: 10}}
                                        text={cardDetails.exp_year}
                                        validate={true}
                                        keyboardType={"numeric"}
                                        multiValidateMode={true}
                                        onBlur={(v) => console.log(v)}
                                        onSubmitEditing={onDismiss}
                                        icon={false}
                                        maxLength={2}
                                        // preicon={EmailIcon}
                                      />
                                    </View>
                                  </View>
                                  <TheTextInput
                                    label={"CVC"}
                                    onChangeText={(e) => setCardDetails((prev) => ({...prev, cvc: e}))}
                                    customStyle={{marginTop: 0, marginBottom: 10, marginTop: 10}}
                                    text={cardDetails.cvc}
                                    validate={true}
                                    onBlur={(v) => console.log(v)}
                                    keyboardType={"numeric"}
                                    multiValidateMode={true}
                                    onSubmitEditing={onDismiss}
                                    icon={false}
                                    maxLength={3}
                                    // preicon={EmailIcon}
                                  />

                                  <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <Image
                                      source={require("../assets/poweredstripe.png")}
                                      style={{width: 120, height: 50, resizeMode: "cover"}}
                                    />
                                  </View>
                                </View>
                              )}
                              <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting || !isValid}>
                                <View
                                  style={{
                                    flex: 1,
                                    height: 40,
                                    backgroundColor: AppColors.appGreen,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 14,
                                    opacity: isSubmitting || !isValid ? 0.45 : 1,
                                  }}
                                >
                                  <Text style={{color: "white", fontSize: 17, fontFamily: fonts.SemiBold}}>
                                    Place Order
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      );
                    }}
                  </Formik>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export {CheckOutScreen};
