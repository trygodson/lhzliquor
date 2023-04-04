import {useNavigation} from "@react-navigation/native";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import FastImage from "react-native-fast-image";
import AppColors from "../../../utils/ColorApp";
import {fonts} from "../../../utils/constants";
import RenderHtml from "react-native-render-html";

const FeaturedItem = ({name, id, images, category, price}) => {
  const {navigate} = useNavigation();
  return (
    <View style={{width: "46%", marginBottom: 20, marginHorizontal: "2%"}}>
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

        {/* <RenderHtml
          contentWidth={50}
          baseStyle={{color: AppColors.lightGray, fontSize: 15, textAlign: "center", fontFamily: fonts.Medium}}
          source={{html: `<b>${category}</b>`}}
        />
 */}
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
