import {scale, verticalScale} from "react-native-size-matters";

export const CONSTANTS = {
  SPACE_9_HORIZONTAL: Math.round(scale(9)),
  SPACE_12_HORIZONTAL: Math.round(scale(12)),
  SPACE_68_HORIZONTAL: Math.round(scale(68)),
  SPACE_24_HORIZONTAL: Math.round(scale(24)),
  SPACE_96_HORIZONTAL: Math.round(scale(96)),
  SPACE_62_HORIZONTAL: Math.round(scale(62)),
  SPACE_90_HORIZONTAL: Math.round(scale(90)),

  //vertical

  SPACE_8_VERTICAL: Math.round(verticalScale(8)),
  SPACE_9_VERTICAL: Math.round(verticalScale(9)),
  SPACE_12_VERTICAL: Math.round(verticalScale(12)),
  SPACE_14_VERTICAL: Math.round(verticalScale(14)),
  SPACE_40_VERTICAL: Math.round(verticalScale(40)),
  SPACE_44_VERTICAL: Math.round(verticalScale(44)),
  SPACE_54_VERTICAL: Math.round(verticalScale(54)),
  SPACE_60_VERTICAL: Math.round(verticalScale(60)),
};

export const fonts = {
  Black: "WorkSans-Black",
  Bold: "WorkSans-Bold",
  ExtraBold: "WorkSans-ExtraBold",
  ExtraLight: "WorkSans-ExtraLight",
  Light: "WorkSans-Light",
  Medium: "WorkSans-Medium",
  Regular: "WorkSans-Regular",
  SemiBold: "WorkSans-SemiBold",
  Thin: "WorkSans-Thin",
};
