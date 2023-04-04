import {useNavigation} from "@react-navigation/native";
import {Text, TouchableWithoutFeedback, useWindowDimensions, View} from "react-native";
import FastImage from "react-native-fast-image";
import RenderHTML from "react-native-render-html";
import AppColors from "../../utils/ColorApp";
import {fonts} from "../../utils/constants";

const FeaturedItem = ({name, id, images, category, price}) => {
  const {navigate} = useNavigation();
  const {width} = useWindowDimensions();
  return (
    <View style={{width: width * 0.5, marginBottom: 20, marginRight: 20}}>
      <TouchableWithoutFeedback onPress={() => navigate("ItemDetails", {id})}>
        <View style={{backgroundColor: AppColors.grayBg, width: "100%", height: 200}}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: images,
              priority: FastImage.priority.normal,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={{marginTop: 10}}>
        <Text style={{color: AppColors.black, fontSize: 15, textAlign: "center", fontFamily: fonts.Medium}}>
          {name}
        </Text>

        <RenderHTML
          contentWidth={50}
          baseStyle={{color: AppColors.lightGray, fontSize: 15, textAlign: "center", fontFamily: fonts.Medium}}
          source={{html: `<b>${category}</b>`}}
        />

        {/* <Text style={{color: AppColors.lightGray, fontSize: 15, textAlign: "center", fontFamily: fonts.Medium}}>
          {category}
        </Text> */}
        <Text style={{color: AppColors.appGreen, fontSize: 15, textAlign: "center", fontFamily: fonts.SemiBold}}>
          ${price}
        </Text>
      </View>
    </View>
  );
};

export default FeaturedItem;
