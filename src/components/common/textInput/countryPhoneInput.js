import React, {useRef, useState} from "react";
import {StyleSheet, TextInput, TouchableOpacity, Text, View} from "react-native";
import styled from "styled-components/native";
import {EyeIcon} from "../../../assets/J_icons/eye";
import CountryPicker, {DARK_THEME} from "react-native-country-picker-modal";
import {CONSTANTS, fonts} from "../../../utils/constants";
import AppColors from "../../../utils/ColorApp";

const textFieldHeight = CONSTANTS.SPACE_40_VERTICAL;
const textSize = CONSTANTS.SPACE_12_VERTICAL;
const titleSize = CONSTANTS.SPACE_9_HORIZONTAL;

const Container = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 20px;
`;
const Container2 = styled.View`
  margin-top: 20px;
`;

const Title = styled.Text`
  color: white;
  font-size: 13px;
  font-family: "Amiko";
`;
const Title2 = styled.Text`
  color: white;
  font-size: 13px;
  font-family: "Amiko";
  margin-bottom: 5px;
`;

const TextInputContainer = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 0 3px;
  border-color: ${AppColors.baseColor};
  border-bottom-width: 1px;
`;
const StyledTextInput = styled(TextInput)`
  height: 40px;
  flex: 1;
  color: white;
  font-family: "Amiko";
  font-size: 16px;
`;

const CountryPhoneInput = ({
  inputHeight = textFieldHeight,
  label = "",
  placeHolder,
  customStyle,
  onChangeText,
  icon = false,
  preicon: Preicon,
  isSecure = false,
  text = "",
  validate = true,
  multiValidateMode = false,
  keyboardType = "default",
  onSubmitEditing,
  autoCapitalize = "none",
  editable,
  onPress,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(isSecure);
  const [changeOnFocus, setChangeOnFocus] = useState(false);
  const [countryCode, setCountryCode] = useState("US");
  const [callingCode, setCallingCode] = useState("1");

  const handleChange = (e) => {
    onChangeText({phone_code: `+${callingCode}`, phone_number: e});
  };
  return (
    <View
      style={{
        backgroundColor: changeOnFocus ? "black" : "#444444",
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderColor: "#444444",
        borderWidth: 1,
        marginBottom: 13,
      }}
    >
      {label !== "" && <Title style={{fontSize: 12, fontFamily: fonts.Regular}}>{label}</Title>}
      <TouchableOpacity onPress={onPress}>
        <View style={{height: 28, flexDirection: "row"}}>
          <View style={{alignItems: "center", flexDirection: "row"}}>
            {icon && (
              <View style={{justifyContent: "center", alignItems: "center", marginRight: 5}}>
                <Preicon />
              </View>
            )}
            <CountryPicker
              withFilter
              countryCode={countryCode}
              withFlag
              withAlphaFilter={false}
              withCurrencyButton={false}
              withCallingCode
              onSelect={(c) => {
                const {cca2, callingCode} = c;
                setCountryCode(cca2);
                setCallingCode(callingCode);
              }}
              containerButtonStyle={{
                alignItems: "center",
                marginLeft: 1,
              }}
              theme={DARK_THEME}
            />
            <Text style={{color: "white"}}>+{callingCode}</Text>
          </View>

          <TextInput
            // height={inputHeight}
            keyboardType={keyboardType}
            selectionColor="white"
            placeholder={placeHolder}
            placeholderTextColor={"#rgba(0,0,0,0.3)"}
            onChangeText={(e) => handleChange(e)}
            value={text}
            secureTextEntry={hidePassword}
            underlineColorAndroid="transparent"
            onSubmitEditing={onSubmitEditing}
            autoCapitalize={autoCapitalize}
            onBlur={() => setChangeOnFocus(false)}
            onFocus={() => setChangeOnFocus(true)}
            // editable={editable}
            pointerEvents={onPress ? "none" : "auto"}
            // multiline
            // textAlignVertical={'top'}
            style={{flex: 1, height: 33, paddingVertical: 0, fontSize: 16}}
          />

          {isSecure && (
            <TouchableOpacity style={styles.hidePass} onPress={() => setHidePassword(!hidePassword)}>
              {<EyeIcon color={hidePassword ? AppColors.lightGray2 : AppColors.appYellow} />}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
const CountryPhoneInput2 = ({
  inputHeight = textFieldHeight,
  label = "",
  placeHolder,
  customStyle,
  onChangeText,
  icon = false,
  preicon: Preicon,
  isSecure = false,
  text = "",
  validate = true,
  multiValidateMode = false,
  keyboardType = "default",
  onSubmitEditing,
  autoCapitalize = "none",
  editable,
  onPress,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(isSecure);
  const [chaangeBottomBorder, setChaangeBottomBorder] = useState(false);
  const [countryCode, setCountryCode] = useState("US");
  const [callingCode, setCallingCode] = useState("1");

  const handleChange = (e) => {
    onChangeText({phone_code: `+${callingCode}`, phone_number: e});
  };
  return (
    <Container2 style={{...customStyle}}>
      {label !== "" && <Title2 style={validate === false && styles.textValidate}>{label}</Title2>}
      <TextInputContainer style={{backgroundColor: "white", borderRadius: 4}}>
        <CountryPicker
          withFilter
          countryCode={countryCode}
          withFlag
          withAlphaFilter={false}
          withCurrencyButton={false}
          withCallingCode
          onSelect={(c) => {
            const {cca2, callingCode} = c;
            setCountryCode(cca2);
            setCallingCode(callingCode);
          }}
          containerButtonStyle={{
            alignItems: "center",
            marginLeft: 1,
          }}
        />
        <Text style={{color: "black"}}>+{callingCode}</Text>

        <StyledTextInput
          height={inputHeight}
          keyboardType={keyboardType}
          selectionColor="black"
          placeholder={placeHolder}
          placeholderTextColor={"#rgba(0,0,0,0.3)"}
          onChangeText={(e) => handleChange(e)}
          value={text}
          onFocus={() => setChaangeBottomBorder(true)}
          onBlur={() => setChaangeBottomBorder(false)}
          secureTextEntry={hidePassword}
          underlineColorAndroid="transparent"
          onSubmitEditing={onSubmitEditing}
          autoCapitalize={autoCapitalize}
          editable={editable}
          style={{color: "black"}}
          {...props}
        />

        {isSecure && (
          <TouchableOpacity style={styles.hidePass} onPress={() => setHidePassword(!hidePassword)}>
            {<EyeIcon color={hidePassword ? AppColors.lightGray2 : AppColors.appYellow} />}
          </TouchableOpacity>
        )}
      </TextInputContainer>
    </Container2>
  );
};

const styles = StyleSheet.create({
  hidePass: {
    padding: 10,
  },
  textValidate: {
    color: "sea-green",
  },
  onFocus: {
    borderBottomColor: AppColors.darkSeaGreen,

    borderBottomWidth: 2,
  },
});

export {CountryPhoneInput, CountryPhoneInput2};
