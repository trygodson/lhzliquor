import {ActivityIndicator, Modal, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import React from "react";
import AppColors from "../../../utils/ColorApp";

const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: "center"}}>
        <ActivityIndicator style={styles.loading} size="large" color={AppColors.appGreen} />
      </View>
    </View>
  );
};
const Loader2 = (loading) => {
  return (
    <View style={{alignItems: "center"}}>
      <ActivityIndicator style={styles.loading} size="large" color={AppColors.appGreen} />
    </View>
  );
};
const Loader3 = ({loading}) => {
  const {height} = useWindowDimensions();
  return (
    loading && (
      <View style={{alignItems: "center", marginBottom: height * 0.1}}>
        <ActivityIndicator style={styles.loading} size="large" color={AppColors.appGreen} />
      </View>
    )
  );
};

export {Loader, Loader2, Loader3};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000060",
    zIndex: 999,
  },
  loading: {
    width: "50%",
    // backgroundColor: "white",
  },
});
