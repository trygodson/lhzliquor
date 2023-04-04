import {useState} from "react";
import {Image, Keyboard, TouchableWithoutFeedback} from "react-native";
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
import {ScrollView} from "react-native";
import {useWindowDimensions} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {loginAction} from "../store/slices/auth/loginSlice";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username Required").matches(/^\S*$/, "No Spaces").min(5, "5 characters above long"),
  // .min(9, 'Phone number is short. Should be 9 characters')
  // .max(8, 'Phone number is long. Should be 9 characters')

  password: Yup.string().min(6, "Min Of Six Characters").required("Password is required"),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const onDismiss = () => {
    Keyboard.dismiss;
  };
  const {height} = useWindowDimensions();
  const onsubmit = (v) => {
    dispatch(loginAction(v));
  };
  return (
    <View style={{flex: 1, backgroundColor: AppColors.mainBG}}>
      <SafeAreaView style={{flex: 1}}>
        <FocusAwareStatusBar barStyle={"dark-content"} translucent backgroundColor={"transparent"} />
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              justifyContent: "center",
              height: height,
              paddingHorizontal: 20,
            }}
          >
            <View style={{justifyContent: "center", alignItems: "center"}}>
              {/* <Text style={{color: "black", fontSize: 34}}>LHZ LIQUOR</Text> */}
              <Image
                source={require("../assets/lhz-logo-sm.png")}
                style={{height: 50, width: "100%", resizeMode: "contain"}}
              />
            </View>

            <View style={{marginTop: 35}}>
              <Text style={{fontSize: 38, fontFamily: fonts.ExtraBold, color: AppColors.black}}>Login</Text>
              <Text style={{fontSize: 16, fontFamily: fonts.ExtraBold, color: AppColors.appGreen, marginVertical: 5}}>
                Please Signin to continue
              </Text>
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  username: "",
                  password: "",
                }}
                onSubmit={(v) => onsubmit(v)}
              >
                {({handleBlur, handleChange, handleSubmit, values, errors, touched, isValid, isSubmitting}) => {
                  return (
                    <>
                      <TheTextInput
                        label={"Username"}
                        onChangeText={handleChange("username")}
                        customStyle={{marginTop: 0, marginBottom: 40, marginTop: 10}}
                        text={values.username}
                        validate={true}
                        multiValidateMode={true}
                        onSubmitEditing={onDismiss}
                        onBlur={handleBlur("username")}
                        error={errors.username && touched.username}
                        icon={true}
                        preicon={EmailIcon}
                      />
                      <TheTextInput
                        label={"Password"}
                        onChangeText={handleChange("password")}
                        customStyle={{marginTop: 0}}
                        text={values.password}
                        validate={true}
                        multiValidateMode={true}
                        onBlur={handleBlur("password")}
                        onSubmitEditing={onDismiss}
                        icon={true}
                        error={errors.password && touched.password}
                        isSecure
                        preicon={PasswordIcon}
                      />

                      <View style={{alignItems: "flex-end"}}>
                        <TouchableOpacity onPress={() => navigate("ForgetPasswordScreen")}>
                          <Text style={{color: AppColors.black, fontSize: 14, fontFamily: fonts.SemiBold}}>
                            Forget Password
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          width: "100%",
                          marginTop: 20,
                          opacity: isSubmitting && !isValid ? 0.4 : 1,
                        }}
                        disabled={isSubmitting && !isValid}
                        onPress={handleSubmit}
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
                              Login
                            </Text>
                            <ArrowRight />
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    </>
                  );
                }}
              </Formik>

              <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                <Text style={{marginRight: 10, color: "black", fontSize: 15}}>Don't Have an Account ?</Text>
                <TouchableOpacity onPress={() => navigate("RegisterScreen")}>
                  <Text style={{color: "black", fontSize: 15, fontFamily: fonts.SemiBold}}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export {LoginScreen};
