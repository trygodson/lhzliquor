import {useState, useEffect} from "react";
import {FlatList, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getFeaturedProductTabAction} from "../../../store/slices/products/featuredProductTab";
import AppColors from "../../../utils/ColorApp";
import {fonts} from "../../../utils/constants";
import {Loader2} from "../../common";
import FeaturedItem from "./featuredItem";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const {height} = useWindowDimensions();
  const [tab, setTab] = useState("?page=1&price_from=100&price_to=400");
  const {response, loading} = useSelector((state) => state.getFeaturesTabProducts);

  useEffect(() => {
    dispatch(getFeaturedProductTabAction({data: tab}));
  }, [tab]);
  return (
    <View style={{marginTop: 40, paddingHorizontal: 20}}>
      <View style={{alignItems: "center", marginBottom: 20}}>
        <Text style={{color: AppColors.lightGray, fontSize: 20, fontFamily: fonts.Regular}}>LHZ PRODUCTS</Text>
        <Text style={{color: AppColors.black, fontSize: 26, fontFamily: fonts.SemiBold}}>FEATURED PRODUCTS</Text>
        <Text style={{color: "#333333", fontSize: 16, fontFamily: fonts.Regular, textAlign: "center", width: "96%"}}>
          Visit our shop to see amazing creations from our designers
        </Text>
      </View>

      <View style={{justifyContent: "space-around", flexDirection: "row", marginBottom: 40}}>
        <TouchableOpacity
          style={
            tab === "?page=1&price_from=100&price_to=400" && {
              borderBottomColor: AppColors.appGreen,
              borderBottomWidth: 4,
            }
          }
          onPress={() => setTab("?page=1&price_from=100&price_to=400")}
        >
          <Text
            style={{
              color: tab === "?page=1&price_from=100&price_to=400" ? AppColors.black : AppColors.lightGray,
              fontSize: 20,
              fontFamily: fonts.Bold,
            }}
          >
            BEST SELLERS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tab === "?page=1&instock=1" && {borderBottomColor: AppColors.appGreen, borderBottomWidth: 4}}
          onPress={() => setTab("?page=1&instock=1")}
        >
          <Text
            style={{
              color: tab === "?page=1&instock=1" ? AppColors.black : AppColors.lightGray,
              fontSize: 20,
              fontFamily: fonts.Bold,
            }}
          >
            IN STOCK
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={tab === "&on_sale=true" && {borderBottomColor: AppColors.appGreen, borderBottomWidth: 4}}
          onPress={() => setTab("&on_sale=true")}
        >
          <Text
            style={{
              color: tab === "&on_sale=true" ? AppColors.black : AppColors.lightGray,
              fontSize: 20,
              fontFamily: fonts.Bold,
            }}
          >
            SALES
          </Text>
        </TouchableOpacity> */}
      </View>

      {loading ? (
        <View style={{justifyContent: "center", alignItems: "center", height: height * 0.4}}>
          <Loader2 />
        </View>
      ) : (
        response &&
        response.length > 0 && (
          <View>
            <FlatList
              data={response}
              numColumns={2}
              renderItem={({item, index}) => (
                <FeaturedItem
                  name={item?.name}
                  price={item?.regular_price}
                  id={item.id}
                  category={item?.categories ? item?.categories[0].name : ""}
                  images={item.image}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )
      )}
    </View>
  );
};

export {FeaturedProducts};
