import {useWindowDimensions} from "react-native";
import {View, Text} from "react-native";
import FastImage from "react-native-fast-image";
import AppColors from "../../../utils/ColorApp";
import {fonts} from "../../../utils/constants";

const CarouselItem = ({image, name, category, price}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={{backgroundColor: AppColors.grayBg, height: height * 0.6, justifyContent: "flex-end"}}>
      <View style={{zIndex: 2, alignItems: "flex-start", top: "20%", position: "absolute", left: "4%"}}>
        <Text style={{color: AppColors.black, fontFamily: fonts.Regular, fontSize: 18, textAlign: "left"}}>
          {category}
        </Text>

        <Text
          style={{color: AppColors.black, fontFamily: fonts.SemiBold, fontSize: 40, textAlign: "left", width: "70%"}}
        >
          {name}
        </Text>
        <Text
          style={{color: AppColors.black, fontFamily: fonts.Regular, fontSize: 18, textAlign: "left", width: "60%"}}
        >
          {""}
        </Text>
        <Text style={{color: AppColors.black, fontFamily: fonts.Light, fontSize: 38, textAlign: "left"}}>
          Only ${price}
        </Text>
      </View>
      {/* <View style={{position: "absolute", right: 0, bottom: 0, width: "100%", height: 300}}>
      </View> */}
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={{
          // uri: "https://z9d7c4u6.rocketcdn.me/wp-content/uploads/2017/01/slider-main-demo-1.jpg",
          uri: image,
          priority: FastImage.priority.high,
        }}
        style={{
          position: "absolute",
          right: "-13%",
          bottom: 0,
          width: "80%",
          height: "100%",
        }}
      />
    </View>
  );
};

export default CarouselItem;
