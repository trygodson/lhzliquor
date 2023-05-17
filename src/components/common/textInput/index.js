import React, {useRef, useState} from "react";
import {Text, View} from "react-native";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {EyeIcon} from "../../../assets/icons/eye";
import DateIcon from "../../../assets/icons/dateIcon.svg";
import AppColors from "../../../utils/ColorApp";
import moment from "moment";
import {CONSTANTS, fonts} from "../../../utils/constants";
import DropShadow from "react-native-drop-shadow";
import DropDownPicker from "react-native-dropdown-picker";

const textFieldHeight = CONSTANTS.SPACE_40_VERTICAL;
const textSize = CONSTANTS.SPACE_12_VERTICAL;
const titleSize = CONSTANTS.SPACE_9_HORIZONTAL;

const Container = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 20px;
  backgroundcolor: #444444;
`;

const Title = styled.Text`
  color: white;

  font-size: 13px;
  font-family: "Amiko";
`;

const TextInputContainer = styled.View`
  // align-items: center;
  // flex-direction: row;
`;
const StyledTextInput = styled(TextInput)`
  color: white;
  font-family: "Amiko";
  font-size: 13px;
`;

const TheTextInput = ({
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
  onBlur,
  error = false,
  onPress,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(isSecure);
  const [changeOnFocus, setChangeOnFocus] = useState(false);
  const inputRef = useRef();

  return (
    <DropShadow
      style={
        changeOnFocus
          ? {
              shadowColor: "#171717",
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }
          : {}
      }
    >
      <View
        style={{
          paddingVertical: 6,
          paddingHorizontal: 15,
          marginBottom: 13,
          backgroundColor: "white",
          borderRadius: 5,
          borderColor: error ? "red" : "#cccccc",
          borderWidth: 1,
          borderBottomColor: changeOnFocus ? "gray" : "#cccccc",
          borderBottomWidth: 1,
          ...customStyle,
        }}
      >
        {label !== "" && (
          <Title style={{fontSize: 12, fontFamily: fonts.SemiBold, color: AppColors.lightGray}}>{label}</Title>
        )}
        <TouchableOpacity onPress={onPress}>
          <View style={{height: 28, flexDirection: "row"}}>
            {icon && (
              <View style={{justifyContent: "center", alignItems: "center"}}>
                <Preicon />
              </View>
            )}

            <TextInput
              // height={inputHeight}
              keyboardType={keyboardType}
              selectionColor="gray"
              placeholder={placeHolder}
              placeholderTextColor={"#rgba(0,0,0,0.3)"}
              onChangeText={onChangeText}
              value={text}
              secureTextEntry={hidePassword}
              underlineColorAndroid="transparent"
              onSubmitEditing={onSubmitEditing}
              autoCapitalize={autoCapitalize}
              onBlur={(v) => {
                setChangeOnFocus(false);
                onBlur(v);
              }}
              onFocus={() => setChangeOnFocus(true)}
              // editable={editable}
              pointerEvents={onPress ? "none" : "auto"}
              // multiline
              // textAlignVertical={'top'}
              style={{flex: 1, height: 33, paddingVertical: 0, paddingLeft: 10, fontSize: 16, color: AppColors.black}}
              {...props}
            />

            {isSecure && (
              <TouchableOpacity style={styles.hidePass} onPress={() => setHidePassword(!hidePassword)}>
                {<EyeIcon color={hidePassword ? AppColors.lightGray2 : AppColors.appGreen} />}
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </DropShadow>
  );
};
const TheTextPhoneInput = ({
  inputHeight = textFieldHeight,
  label = "",
  placeHolder,
  customStyle,
  onChangeText,
  icon = false,
  preicon: Preicon,
  isSecure = false,
  text = "",
  phoneCode,
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
  const inputRef = useRef();

  return (
    <DropShadow
      style={
        changeOnFocus
          ? {
              shadowColor: "#171717",
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }
          : {}
      }
    >
      <View
        style={{
          paddingVertical: 6,
          paddingHorizontal: 15,
          marginBottom: 13,
          backgroundColor: "white",
          borderRadius: 5,
          borderBottomColor: changeOnFocus ? "gray" : "#cccccc",
          borderBottomWidth: 1,
          ...customStyle,
        }}
      >
        {label !== "" && (
          <Title style={{fontSize: 12, fontFamily: fonts.SemiBold, color: AppColors.lightGray}}>{label}</Title>
        )}
        <TouchableOpacity onPress={onPress}>
          <View style={{height: 28, flexDirection: "row"}}>
            {icon && (
              <View style={{justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 13, color: AppColors.lightGray2, fontFamily: fonts.Medium}}>+{phoneCode}</Text>
              </View>
            )}

            <TextInput
              // height={inputHeight}
              keyboardType={keyboardType}
              selectionColor="gray"
              placeholder={placeHolder}
              placeholderTextColor={"#rgba(0,0,0,0.3)"}
              onChangeText={onChangeText}
              value={text}
              secureTextEntry={hidePassword}
              underlineColorAndroid="transparent"
              onSubmitEditing={onSubmitEditing}
              autoCapitalize={autoCapitalize}
              onBlur={() => setChangeOnFocus(false)}
              onFocus={() => setChangeOnFocus(true)}
              maxLength={10}
              // editable={editable}
              pointerEvents={onPress ? "none" : "auto"}
              // multiline
              // textAlignVertical={'top'}
              style={{flex: 1, height: 33, paddingVertical: 0, paddingLeft: 10, fontSize: 16, color: AppColors.black}}
            />

            {isSecure && (
              <TouchableOpacity style={styles.hidePass} onPress={() => setHidePassword(!hidePassword)}>
                {<EyeIcon color={hidePassword ? AppColors.lightGray2 : AppColors.appGreen} />}
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </DropShadow>
  );
};
const TheTextInput2 = ({
  inputHeight = textFieldHeight,
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
  const inputRef = useRef();

  return (
    <View
      style={{
        backgroundColor: "transparent",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: "#858585",
        borderWidth: 1,
        marginTop: 5,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={{height: 28, flexDirection: "row"}}>
          {icon && (
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Preicon />
            </View>
          )}
          <TextInput
            // height={inputHeight}
            keyboardType={keyboardType}
            selectionColor="white"
            placeholder={placeHolder}
            placeholderTextColor={"#rgba(0,0,0,0.3)"}
            onChangeText={onChangeText}
            value={text}
            secureTextEntry={hidePassword}
            underlineColorAndroid="transparent"
            onSubmitEditing={onSubmitEditing}
            autoCapitalize={autoCapitalize}
            // editable={editable}
            pointerEvents={onPress ? "none" : "auto"}
            // multiline
            // textAlignVertical={'top'}
            style={{flex: 1, height: 33, paddingVertical: 0, fontSize: 18, fontFamily: fonts.Medium}}
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

const CustomDropDownCountry = ({
  items,
  setItems,
  value,
  setValue,
  label,
  labelStyle,
  customPlaceHolder,
  customPlaceHolderStyle,
  searchable = false,
  dropDownDirection = "BOTTOM",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{}}>
      {label !== "" && (
        <Title style={{fontSize: 12, fontFamily: fonts.SemiBold, color: AppColors.lightGray, marginLeft: 15}}>
          {label}
        </Title>
      )}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        listMode="MODAL"
        placeholder={"Select Country"}
        placeholderStyle={{color: AppColors.lightGray, fontSize: 16, fontWeight: "500", ...customPlaceHolderStyle}}
        containerStyle={{
          paddingVertical: 6,
          paddingHorizontal: 5,
          marginBottom: 13,
          backgroundColor: "white",
          borderRadius: 5,
          borderBottomColor: "#cccccc",
          borderBottomWidth: 1,
        }}
        style={{
          backgroundColor: "white",
          borderWidth: 0,
        }}
        disableBorderRadius={false}
        dropDownContainerStyle={{paddingVertical: 10}}
        dropDownDirection={dropDownDirection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hidePass: {
    padding: 7,
  },
  textValidate: {
    color: "sea-green",
  },
  onFocus: {
    borderBottomColor: AppColors.darkSeaGreen,

    borderBottomWidth: 2,
  },
});

export {TheTextInput, TheTextInput2, TheTextPhoneInput, CustomDropDownCountry};
