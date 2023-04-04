import {FlatList, ScrollView} from "react-native";
import {View} from "react-native";
import Carousel, {Pagination} from "react-native-new-snap-carousel";
import {SafeAreaView} from "react-native-safe-area-context";
import {CustomHeader2} from "../components/common";
import AppColors from "../utils/ColorApp";
import {useWindowDimensions} from "react-native";
import CarouselItem from "../components/homecomponent/CarouselItem";
import {dummySlider} from "../utils/others";
import {useState} from "react";
import {FeaturedProducts} from "../components/homecomponent/featured";
import {FeaturedCategory} from "../components/homecomponent/featuredCategories";
import {useSelector} from "react-redux";

const HomeScreen = () => {
  const {width} = useWindowDimensions();
  const [sliderIndex, setSliderIndex] = useState(0);
  const {response, loading} = useSelector((state) => state.getFeaturesSliderProducts);
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 />

        <FlatList
          ListHeaderComponent={
            response &&
            response?.length > 0 && (
              <View>
                <Carousel
                  data={response}
                  renderItem={({item, index}) => (
                    <CarouselItem
                      image={item?.image}
                      name={item.name}
                      category={item?.categories ? item?.categories[0]?.name : ""}
                      price={item?.regular_price}
                      key={index}
                    />
                  )}
                  sliderWidth={width}
                  itemWidth={width}
                  // onSnapToItem={(index) => setSliderIndex(index)}
                  loop={true}
                  bounces={false}
                  autoplay
                />
                <Pagination
                  dotsLength={response.length}
                  activeDotIndex={sliderIndex}
                  containerStyle={{position: "absolute", bottom: 0, right: 0, left: 0}}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: "#333333",
                  }}
                  inactiveDotStyle={
                    {
                      // Define styles for inactive dots here
                    }
                  }
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
              </View>
            )
          }
          ListFooterComponent={
            <>
              <FeaturedCategory />
              <FeaturedProducts />
            </>
          }
          listKey={(item, index) => `_key${index.toString()}`}
          keyExtractor={(item, index) => `_key${index.toString()}`}
        />
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        {/* {response && response?.length > 0 && (
            <View>
              <Carousel
                data={response}
                renderItem={({item, index}) => (
                  <CarouselItem
                    image={item?.image}
                    name={item.name}
                    category={item?.categories ? item?.categories[0]?.name : ""}
                    price={item?.regular_price}
                    key={index}
                  />
                )}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={(index) => setSliderIndex(index)}
                loop={true}
                bounces={false}
                autoplay
              />
              <Pagination
                dotsLength={response.length}
                activeDotIndex={sliderIndex}
                containerStyle={{position: "absolute", bottom: 0, right: 0, left: 0}}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: "#333333",
                }}
                inactiveDotStyle={
                  {
                    // Define styles for inactive dots here
                  }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>
          )} */}
        {/* </ScrollView> */}
      </SafeAreaView>
    </View>
  );
};

export {HomeScreen};
