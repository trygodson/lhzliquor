import {useState} from "react";
import {FlatList, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import FastImage from "react-native-fast-image";
import {useSelector} from "react-redux";
import AppColors from "../../../utils/ColorApp";
import {fonts} from "../../../utils/constants";
import {Loader2} from "../../common";
import FeaturedCategoryItem from "./featuredCategoryItem";

const FeaturedCategory = () => {
  const [tab, setTab] = useState(1);
  const {home, loading} = useSelector((state) => state.getFeaturesCategory);

  return (
    <View style={{marginTop: 40, paddingHorizontal: 20}}>
      <View style={{alignItems: "center", marginBottom: 20}}>
        <Text style={{color: AppColors.lightGray, fontSize: 20, fontFamily: fonts.Regular}}>LhzLiquor Collection</Text>
        <Text style={{color: AppColors.black, fontSize: 26, fontFamily: fonts.SemiBold}}>FEATURED CATEGORIES</Text>
        <Text style={{color: "#333333", fontSize: 16, fontFamily: fonts.Regular, textAlign: "center", width: "96%"}}>
          LhzLiquor has the best and quality liquor
        </Text>
      </View>

      {home && home.length > 0 && (
        <View>
          <FlatList
            data={home}
            numColumns={2}
            renderItem={({item, index}) => (
              <FeaturedCategoryItem id={item?.id} count={item?.count} name={item?.name} image={item?.image} />
            )}
            contentContainerStyle={{flex: 1, justifyContent: "center", alignItems: "stretch"}}
            keyExtractor={(item) => `${item?.name}_${item.id}`}
            listKey={(item, index) => `_keyy${index.toString()}`}
          />
        </View>
      )}
      {loading && home.length === 0 && (
        <View>
          <Loader2 />
        </View>
      )}
    </View>
  );
};

export {FeaturedCategory};
