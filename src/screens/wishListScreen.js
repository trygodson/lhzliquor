import {View, Text, TouchableOpacity, SafeAreaView, FlatList, useWindowDimensions} from "react-native";
import {useSelector} from "react-redux";
import {CustomHeader2} from "../components/common";
import FeaturedItem from "../components/homecomponent/featured/featuredItem";
import Empty from "../assets/icons/empty1.svg";
const WishListScreen = () => {
  const {wishlist} = useSelector((state) => state.wishList);
  const {height} = useWindowDimensions();
  const RenderEmpty = () => {
    return (
      <View style={{width: "100%", height: height * 0.8, alignItems: "center", justifyContent: "center"}}>
        <Empty style={{alignSelf: "center"}} />
      </View>
    );
  };
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 title={"Wishlist"} />

        <View style={{paddingHorizontal: 15}}>
          {wishlist && (
            <View style={{paddingTop: 13}}>
              <FlatList
                data={wishlist}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                  <FeaturedItem
                    name={item?.name}
                    price={item?.regular_price}
                    id={item.id}
                    category={item?.categories ? item?.categories[0].name : ""}
                    images={item.image}
                  />
                )}
                //ListEmptyComponent={<RenderEmpty />}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WishListScreen;
