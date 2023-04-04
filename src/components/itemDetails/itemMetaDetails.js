import {useState, useEffect} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {getFeaturedProducts} from "../../services/getProducts";
import AppColors from "../../utils/ColorApp";
import {fonts} from "../../utils/constants";
import {Loader2} from "../common";
import FeaturedItem from "./featuredItem";

const ItemMetaDetails = ({id}) => {
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    (function () {
      setLoading(true);
      getFeaturedProducts({queries: `?page=1&categories=${id}`})
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);

          setLoading(false);
        });
    })();
  }, []);
  return (
    <>
      <View style={{justifyContent: "flex-start", flexDirection: "row", marginBottom: 20}}>
        <TouchableOpacity
          style={tab === 1 && {borderBottomColor: AppColors.black, borderBottomWidth: 3, paddingBottom: 5}}
          onPress={() => setTab(1)}
        >
          <Text
            style={{color: tab === 1 ? AppColors.black : AppColors.lightGray, fontSize: 16, fontFamily: fonts.Bold}}
          >
            Description
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={tab === 2 && {borderBottomColor: AppColors.black, borderBottomWidth: 3, paddingBottom: 5}}
          onPress={() => setTab(2)}
        >
          <Text
            style={{color: tab === 2 ? AppColors.black : AppColors.lightGray, fontSize: 16, fontFamily: fonts.Bold}}
          >
            Additional Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tab === 3 && {borderBottomColor: AppColors.black, borderBottomWidth: 3, paddingBottom: 5}}
          onPress={() => setTab(3)}
        >
          <Text
            style={{color: tab === 3 ? AppColors.black : AppColors.lightGray, fontSize: 16, fontFamily: fonts.Bold}}
          >
            Shipping Info
          </Text>
        </TouchableOpacity> */}
      </View>

      <View style={{marginBottom: 20}}>
        {/* <Text style={{fontFamily: fonts.Light, fontSize: 17, color: AppColors.black, marginBottom: 10}}>
          As in handbags, the double ring and bar design defines the wallet shape, highlighting the front flap closure
          which is tucked inside the hardware. Completed with an organizational interior, the black leather wallet
          features a detachable chain.
        </Text>

        <Text style={{color: AppColors.black, fontSize: 17, fontFamily: fonts.Bold, marginBottom: 15}}>
          IMPERIENT HADIO
        </Text>

        <Text style={{fontFamily: fonts.Light, fontSize: 17, color: AppColors.black}}>
          As in handbags, the double ring and bar design defines the wallet shape, highlighting the front flap closure
          which is tucked inside the hardware. Completed with an organizational interior, the black leather wallet
          features a detachable chain.
        </Text> */}
      </View>

      <View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontFamily: fonts.Bold, fontSize: 25, color: AppColors.black, marginBottom: 10}}>
            YOU MAY ALSO LIKE
          </Text>
          <View style={{width: 60, height: 4, backgroundColor: AppColors.appGreen}}></View>
        </View>

        {loading ? (
          <View style={{width: "100%", alignItems: "center"}}>
            <Loader2 />
          </View>
        ) : (
          data &&
          data.length > 0 && (
            <FlatList
              data={data}
              horizontal
              keyExtractor={(item) => item?.id}
              renderItem={({item}) => (
                <FeaturedItem
                  name={item?.name}
                  price={item?.regular_price}
                  id={item.id}
                  category={item?.categories[0].name}
                  images={item.images[0]?.src}
                />
              )}
            />
          )
        )}
        {/* <View style={{width: "100%"}}>
        </View> */}
      </View>
    </>
  );
};

export {ItemMetaDetails};
