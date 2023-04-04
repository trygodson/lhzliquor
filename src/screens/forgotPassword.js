import {useState} from "react";
import {ActivityIndicator, Image, Keyboard, TouchableWithoutFeedback} from "react-native";
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
import {ResetPasswordService} from "../services/auth";
import {customToast} from "../utils/toast";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username Required").matches(/^\S*$/, "No Spaces").min(5, "5 characters above long"),
  email: Yup.string().email("Invalid email address").required("Password is required"),
});

const ForgetPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const {navigate, goBack} = useNavigation();
  const onDismiss = () => {
    Keyboard.dismiss;
  };
  const {height} = useWindowDimensions();
  const onsubmit = (v) => {
    setLoading(true);
    ResetPasswordService(v)
      .then((res) => {
        setLoading(false);

        if (res.status === true) {
          alert(res?.message);
          goBack();
        } else {
          alert(JSON.stringify(res?.error));
        }
      })
      .catch((err) => {
        setLoading(false);
        customToast(JSON.stringify(err));
      });
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
              {/* <Text style={{fontSize: 38, fontFamily: fonts.ExtraBold, color: AppColors.black}}></Text> */}
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.ExtraBold,
                  color: AppColors.black,
                  marginVertical: 5,
                  textAlign: "center",
                }}
              >
                Reset Password and Get Instant Password on Email
              </Text>
              <Formik
                validationSchema={validationSchema}
                validateOnMount
                validateOnChange
                initialValues={{
                  username: "",
                  email: "",
                }}
                onSubmit={(v) => onsubmit(v)}
              >
                {({handleBlur, handleChange, handleSubmit, values, errors, touched, isSubmitting, isValid}) => {
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
                        label={"Email"}
                        onChangeText={handleChange("email")}
                        customStyle={{marginTop: 0}}
                        text={values.email}
                        validate={true}
                        multiValidateMode={true}
                        onBlur={handleBlur("email")}
                        onSubmitEditing={onDismiss}
                        icon={true}
                        error={errors.email && touched.email}
                        preicon={EmailIcon}
                      />

                      <TouchableOpacity
                        style={{
                          alignItems: "flex-end",
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
                          {loading ? (
                            <ActivityIndicator color={"white"} style={{width: 33}} />
                          ) : (
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                              <Text style={{color: "white", fontSize: 17, fontFamily: fonts.Medium, marginRight: 10}}>
                                Reset
                              </Text>
                              <ArrowRight />
                            </View>
                          )}
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

export {ForgetPasswordScreen};
