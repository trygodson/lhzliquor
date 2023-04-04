import {useState} from "react";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {View, Text} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import {SafeAreaView} from "react-native-safe-area-context";
import {FocusAwareStatusBar} from "../components/common";
import {TheTextInput} from "../components/common/textInput";
import AppColors from "../utils/ColorApp";
import {fonts} from "../utils/constants";
import EmailIcon from "../assets/icons/email.svg";
import PasswordIcon from "../assets/icons/password.svg";
import ArrowRight from "../assets/icons/arrowright.svg";
import GoBack from "../assets/icons/goback.svg";

import {ScrollView} from "react-native";
import {useWindowDimensions} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {registerAction} from "../store/slices/auth/registerSlice";

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
  username: Yup.string().required("CountryCode is required"),
  password: Yup.string().min(8, "8 characters above long").required("Password is required"),
  confirm_password: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password"), null], "password must match"),
  // city: Yup.string().required("City is required"),
  // postcode: Yup.string().required(" Postcode is required"),
});

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const {navigate, goBack} = useNavigation();
  const [data, setData] = useState({email: null, password: null});
  const onDismiss = () => {
    Keyboard.dismiss;
  };
  const {height} = useWindowDimensions();

  const onsubmit = (v) => {
    let dd = {...v};
    dispatch(registerAction(dd));
  };
  return (
    <View style={{flex: 1, backgroundColor: AppColors.mainBG}}>
      <SafeAreaView style={{flex: 1}}>
        <FocusAwareStatusBar barStyle={"dark-content"} translucent backgroundColor={"transparent"} />
        <View style={{flexDirection: "row", alignItems: "center", paddingLeft: 15, paddingVertical: 10}}>
          <TouchableOpacity onPress={() => goBack()} style={{marginRight: 10, width: 30, height: "80%"}}>
            <GoBack />
          </TouchableOpacity>
        </View>

        <ScrollView style={{flex: 1}}>
          <View
            style={{
              justifyContent: "center",
              height: height,
              paddingHorizontal: 20,
            }}
          >
            <View>
              <Text style={{fontSize: 38, fontFamily: fonts.ExtraBold, color: AppColors.black}}>Sign Up</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.ExtraBold,
                  color: AppColors.appGreen,
                  marginVertical: 5,
                  marginBottom: 20,
                }}
              >
                Create an Account and Start Shopping
              </Text>
              <Formik
                validationSchema={validationSchema}
                validateOnMount
                initialValues={{
                  last_name: "",
                  first_name: "",
                  password: "",
                  email: "",
                  username: "",
                  confirm_password: "",
                  // city: "singapore",
                  // postcode: "564656",
                }}
                onSubmit={(v) => onsubmit(v)}
              >
                {({handleBlur, handleChange, handleSubmit, values, errors, touched, isSubmitting, isValid}) => {
                  return (
                    <>
                      <TheTextInput
                        label={"First Name"}
                        onChangeText={handleChange("first_name")}
                        onBlur={handleBlur("first_name")}
                        customStyle={{marginTop: 0}}
                        text={values.first_name}
                        validate={true}
                        multiValidateMode={true}
                        onSubmitEditing={onDismiss}
                        icon={false}
                        error={errors.first_name && touched.first_name}
                        preicon={EmailIcon}
                      />
                      <TheTextInput
                        label={"Last Name"}
                        customStyle={{marginTop: 0}}
                        text={values.last_name}
                        onChangeText={handleChange("last_name")}
                        onBlur={handleBlur("last_name")}
                        validate={true}
                        multiValidateMode={true}
                        onSubmitEditing={onDismiss}
                        icon={false}
                        error={errors.last_name && touched.last_name}
                        preicon={PasswordIcon}
                      />
                      <TheTextInput
                        label={"User Name"}
                        customStyle={{marginTop: 0}}
                        text={values.username}
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        validate={true}
                        multiValidateMode={true}
                        onSubmitEditing={onDismiss}
                        icon={false}
                        error={errors.username && touched.username}
                        preicon={PasswordIcon}
                      />
                      <TheTextInput
                        label={"Email"}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        customStyle={{marginTop: 0}}
                        text={values.email}
                        validate={true}
                        multiValidateMode={true}
                        onSubmitEditing={onDismiss}
                        icon={true}
                        error={errors.email && touched.email}
                        preicon={EmailIcon}
                      />
                      <TheTextInput
                        label={"Password"}
                        customStyle={{marginTop: 0}}
                        text={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        validate={true}
                        multiValidateMode={true}
                        onSubmitEditing={onDismiss}
                        icon={true}
                        error={errors.password && touched.password}
                        isSecure
                        preicon={PasswordIcon}
                      />
                      <TheTextInput
                        label={"Confirm Password"}
                        customStyle={{marginTop: 0}}
                        text={values.confirm_password}
                        onChangeText={handleChange("confirm_password")}
                        onBlur={handleBlur("confirm_password")}
                        validate={true}
                        multiValidateMode={true}
                        onSubmitEditing={onDismiss}
                        icon={true}
                        error={errors.confirm_password && touched.confirm_password}
                        isSecure
                        preicon={PasswordIcon}
                      />

                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          width: "100%",
                          marginTop: 20,
                          opacity: isSubmitting && !isValid ? 0.4 : 1,
                        }}
                        onPress={handleSubmit}
                        disabled={isSubmitting && !isValid}
                      >
                        <LinearGradient
                          colors={["#cde2ae", "#83b735", "#628928"]}
                          start={{x: 0.0, y: 1.5}}
                          end={{x: 1.0, y: 1.0}}
                          style={{
                            height: 48,
                            width: "45%",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                          }}
                        >
                          <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{color: "white", fontSize: 17, fontFamily: fonts.Medium, marginRight: 10}}>
                              Register
                            </Text>
                            <ArrowRight />
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    </>
                  );
                }}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export {RegisterScreen};
