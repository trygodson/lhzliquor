import {Dimensions} from "react-native";
const {width, height} = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const vtscale = (size) => (height / guidelineBaseHeight) * size;
const mdscale = (size, factor = 1) => size + (scale(size) - size) * factor;

export {scale, vtscale, mdscale};
