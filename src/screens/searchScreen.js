import {View, SafeAreaView, TextInput, Text, Pressable, useWindowDimensions} from "react-native";
import SearchIcon from "../assets/icons/searchFilled.svg";
import DropShadow from "react-native-drop-shadow";
import AppColors from "../utils/ColorApp";
import {CONSTANTS, fonts} from "../utils/constants";
import {FlatList} from "react-native";
import FeaturedItem from "../components/homecomponent/featured/featuredItem";
import {useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchProductAction} from "../store/slices/products/searchProduct";
import {Loader2} from "../components/common";
import EmptySearch from "../assets/icons/emptysearch.svg";

const SearchScreen = () => {
  const searchInputRef = useRef();
  const debounceRef = useRef();
  const dispatch = useDispatch();
  const {height} = useWindowDimensions();
  const {response, loading} = useSelector((state) => state?.searchProducts);
  const handleSearchText = (e) => {
    clearTimeout(debounceRef.current);
    if (e !== "") {
      debounceRef.current = setTimeout(() => {
        dispatch(searchProductAction({data: `?search=${e}`}));
      }, 400);
    }
  };

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <DropShadow
          style={{
            shadowColor: "#171717",
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.2,
            shadowRadius: 1,
            marginBottom: 20,
            height: CONSTANTS.SPACE_54_VERTICAL,
            // borderBottomColor: "gray",
            // borderBottomWidth: 1,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "white",

              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 17,
              paddingVertical: 14,
            }}
          >
            <SearchIcon />
            <TextInput
              style={{
                color: AppColors.black,
                fontSize: 16,
                fontFamily: fonts.Medium,
                marginLeft: 14,
                flex: 1,
                paddingVertical: 0,
              }}
              placeholder="Search"
              placeholderTextColor={AppColors.black}
              ref={searchInputRef}
              onChangeText={handleSearchText}
            />
          </Pressable>
        </DropShadow>
        <View style={{paddingHorizontal: 15, paddingBottom: 22, paddingTop: 1}}>
          {loading ? (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Loader2 />
            </View>
          ) : (
            response && (
              <View style={{paddingTop: 13}}>
                <FlatList
                  data={response}
                  numColumns={2}
                  keyExtractor={(item) => item?.id}
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
                    <View
                      style={{
                        width: "100%",
                        paddingHorizontal: "10%",
                        height: height * 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EmptySearch style={{alignSelf: "center", width: "90%"}} />
                      <Text style={{fontSize: 20, color: AppColors.black, fontFamily: fonts.SemiBold}}>
                        No Items Found
                      </Text>
                    </View>
                  }
                />
              </View>
            )
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export {SearchScreen};
