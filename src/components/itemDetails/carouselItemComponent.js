import {useWindowDimensions} from "react-native";
import {View, Text} from "react-native";
import FastImage from "react-native-fast-image";
import AppColors from "../../utils/ColorApp";

const CarouselItemPicture = ({image}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={{padding: 10}}>
      <View style={{backgroundColor: AppColors.grayBg, height: height * 0.5, width: "100%", borderRadius: 10}}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={{
            // uri: "https://z9d7c4u6.rocketcdn.me/wp-content/uploads/2017/01/slider-main-demo-1.jpg",
            uri: image,
            priority: FastImage.priority.high,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    </View>
  );
};

export {CarouselItemPicture};
