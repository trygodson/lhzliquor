import React, {useState} from "react";
import {View, Image, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet} from "react-native";
import {StackActions, useNavigation} from "@react-navigation/native";
import {fonts} from "../../../utils/constants";
import {navigationRef} from "../../../Main";
import AppColors from "../../../utils/ColorApp";
function Signuppop(props) {
  const {navigate} = useNavigation();
  return (
    <View
      // bottom={0}
      overlayVisible={false}
      style={{padding: 15, alignContent: "center", marginTop: 120}}
      isOpen={props.isOpen}
      onClose={() => {
        props.close();
      }}
      closeOnOverlayClick={true}
      size={"full"}
    >
      <ImageBackground style={{padding: 18}}>
        <View>
          <Text style={styls.text1}>Sign In</Text>
          <Text style={styls.text2}>
            Do you want to Sign In to get the full access for all Our Products, and start Buying
          </Text>
          <View style={styls.view}>
            <TouchableOpacity>{/* <Text style={styls.text3}> Skip for now </Text> */}</TouchableOpacity>
            <TouchableOpacity
              style={{padding: 15, backgroundColor: AppColors.appGreen}}
              onPress={() => {
                navigationRef.navigate("LoginScreen");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginRight: 25,
                  marginLeft: 25,
                  fontFamily: fonts.Medium,
                  color: "#fefefe",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styls = StyleSheet.create({
  text1: {color: AppColors.black, fontSize: 26, fontFamily: fonts.Bold, alignSelf: "center", marginTop: 10},
  text2: {
    fontSize: 14,
    fontFamily: fonts.Medium,
    lineHeight: 22,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20,
    color: AppColors.black,
  },
  text3: {fontSize: 15, color: "#4375AF", marginLeft: 20},
  view: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, marginBottom: 15},
});
export {Signuppop};
