import {useNavigation} from "@react-navigation/native";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import FastImage from "react-native-fast-image";
import AppColors from "../../../utils/ColorApp";
import {fonts} from "../../../utils/constants";
import RenderHtml from "react-native-render-html";
const FeaturedCategoryItem = ({id, name, count, image}) => {
  const {navigate} = useNavigation();
  return (
    <View style={{width: "100%", flex: 1, marginBottom: 20, marginHorizontal: "1%"}}>
      <TouchableWithoutFeedback
        onPress={() => navigate("ShopScreen", {screen: "HomeScreen", params: {category: name}})}
      >
        <View style={{backgroundColor: AppColors.grayBg, width: "100%", height: 160}}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: image ?? "https://woodmart.xtemos.com/wp-content/uploads/2017/03/light8_2-opt-430x491.jpg",
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
        <RenderHtml
          contentWidth={50}
          baseStyle={{color: AppColors.black, fontSize: 15, textAlign: "center", fontFamily: fonts.SemiBold}}
          source={{html: `<b>${name}</b>`}}
        />
        {/* <Text style={{color: AppColors.black, fontSize: 15, textAlign: "center", fontFamily: fonts.SemiBold}}></Text> */}
        {/* <Text style={{color: AppColors.lightGray, fontSize: 15, textAlign: "center", fontFamily: fonts.Medium}}>
          {count} Products
        </Text> */}
      </View>
    </View>
  );
};

export default FeaturedCategoryItem;
