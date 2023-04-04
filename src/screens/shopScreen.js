import {useState, useEffect, useRef} from "react";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {CustomHeader2, Loader2, Loader3} from "../components/common";
import SearchIcon from "../assets/icons/searchFilled.svg";
import DropShadow from "react-native-drop-shadow";
import AppColors from "../utils/ColorApp";
import {fonts} from "../utils/constants";
import FeaturedItem from "../components/homecomponent/featured/featuredItem";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import RenderHTML from "react-native-render-html";
import {
  getProductsByCategoryandOthersAction,
  productByCategoryDefaultState,
} from "../store/slices/products/productsByCategory";

const ShopScreen = ({route, navigation}) => {
  let ppage = 1;
  const {height, width} = useWindowDimensions();
  const listRef = useRef();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryTab, setCategoryTab] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setpage] = useState(1);
  const [uLoading, setULoading] = useState(false);
  const {shop} = useSelector((state) => state.getFeaturesCategory);
  const {loading: dloading, response, listEnd} = useSelector((state) => state.getProductsByCategory);

  useEffect(() => {
    if (category === null || category === undefined) {
      setLoading(true);
      dispatch(productByCategoryDefaultState());
      dispatch(getProductsByCategoryandOthersAction({data: `?page=${ppage}`})).then(() => setLoading(false));
    } else {
      setLoading(true);
      dispatch(productByCategoryDefaultState());

      dispatch(getProductsByCategoryandOthersAction({data: `?page=${ppage}&categories=${category}`})).then(() =>
        setLoading(false)
      );
    }
  }, [category]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.category !== undefined) {
        setCategory(route.params?.category);
      }
    });

    return () => {
      dispatch(productByCategoryDefaultState());
      setCategory("");
    };
  }, [route.params?.category]);

  const loadMore = () => {
    if (!listEnd) {
      setPageNumber(page + 1);
    }
  };

  useEffect(() => {
    setULoading(true);

    dispatch(getProductsByCategoryandOthersAction({data: `?page=${page}&categories=${category}`})).then(() =>
      setULoading(false)
    );
  }, [pageNumber]);

  // const scrollToLocation = (index) => {
  //   try {
  //     listRef.current?.scrollToLocation({
  //       itemIndex: 1,
  //       sectionIndex: index,
  //       viewOffset: getStatusBarHeight(),
  //     });
  //   } catch (e) {
  //     console.log("scrollToLocation failed: ", e);
  //   }
  // };
  console.log("scrollToLocation failed: ", response);
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 title={"Shop Now"} />
        <View style={{paddingHorizontal: 15, paddingBottom: 22, paddingTop: 10}}>
          <DropShadow
            style={{
              shadowColor: "#171717",
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 1,
              marginBottom: 20,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 6,
                flexDirection: "row",
                paddingHorizontal: 13,
                paddingVertical: 14,
              }}
              onPress={() => navigate("SearchScreen")}
            >
              <SearchIcon />
              <Text style={{color: AppColors.black, fontSize: 16, fontFamily: fonts.Medium, marginLeft: 14}}>
                Search
              </Text>
            </Pressable>
          </DropShadow>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingBottom: 2}}>
              {shop &&
                shop.length > 0 &&
                Array.from(shop).map((item, i) => {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: AppColors.appGreen,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        alignItems: "center",
                        borderRadius: 5,
                        opacity: item?.name === category ? 1 : 0.3,
                        marginRight: 20,
                      }}
                      key={i}
                      onPress={() => {
                        ppage = 1;
                        setCategory(item?.name);
                        setCategoryTab(item?.name);
                      }}
                    >
                      <RenderHTML
                        contentWidth={50}
                        baseStyle={{
                          color: item?.name === category ? "white" : AppColors.black,
                          fontSize: 13,
                          fontFamily: fonts.Regular,
                        }}
                        source={{html: item?.name}}
                      />
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>

          {loading ? (
            <View style={{height: height * 0.55, width, justifyContent: "center", alignItems: "center"}}>
              <Loader2 />
            </View>
          ) : (
            response &&
            response.length > 0 && (
              <View style={{paddingTop: 13, marginBottom: height * 0.3}}>
                <FlatList
                  ref={listRef}
                  data={response}
                  numColumns={2}
                  showsVerticalScrollIndicator={true}
                  keyExtractor={(item) => `${item?.name}_${item?.id}`}
                  renderItem={({item, index}) => (
                    <FeaturedItem
                      name={item?.name}
                      price={item?.regular_price}
                      id={item.id}
                      category={item?.categories ? item?.categories[0].name : ""}
                      images={item.image}
                    />
                  )}
                  ListEmptyComponent={
                    <View style={{justifyContent: "center", alignItems: "center", width: width, height: height * 0.4}}>
                      <Text style={{fontSize: 21, fontFamily: fonts.SemiBold, color: AppColors.black}}>
                        No Products Available for {category ?? ""}
                      </Text>
                    </View>
                  }
                  onEndReachedThreshold={0.2}
                  ListFooterComponent={
                    <>
                      {uLoading && <Loader3 loading={uLoading} />}
                      {listEnd && <Text style={{color: AppColors.black, fontSize: 14}}>No More Items Available</Text>}
                    </>
                  }
                  onEndReached={({distanceFromEnd}) => {
                    console.log(distanceFromEnd);
                    loadMore();
                    // if (distanceFromEnd > 55) {
                    // }
                  }}
                  // onEndReached={loadMore}
                />
              </View>
            )
          )}

          {}
        </View>
      </SafeAreaView>
    </View>
  );
};

export {ShopScreen};
