import {useEffect, useState} from "react";
import {ActivityIndicator, Image, ScrollView, useWindowDimensions, Text, View} from "react-native";
import {orderDetails} from "../../services/orders";
import {getProductsDetails} from "../../services/getProducts";
import AppColors from "../../utils/ColorApp";
import {customToast} from "../../utils/toast";
import {Loader2} from "../common";
import {fonts} from "../../utils/constants";

const TheOrderDetailsImage = ({id}) => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const {width} = useWindowDimensions();

  useEffect(() => {
    setLoading(true);
    getProductsDetails({queries: id})
      .then((response) => {
        if (response.status === true) {
          setData(response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        customToast(JSON.stringify(err));
        setLoading(false);
      });
  }, []);

  console.log(data, "-----data-----");
  return (
    <View style={{width: width * 0.35, height: 165, justifyContent: "center", alignItems: "center"}}>
      {loading ? (
        <ActivityIndicator color={AppColors.appGreen} style={{width: 30, alignSelf: "center"}} />
      ) : (
        <View style={{alignItems: "center", width: "100%"}}>
          <Image source={{uri: data?.image}} style={{width: "100%", resizeMode: "contain", height: "82%"}} />
          <Text style={{fontSize: 12, color: AppColors.black, fontFamily: fonts.Regular, height: "15%"}}>
            {data?.name}
          </Text>
        </View>
      )}
    </View>
  );
};

export const OrderDetailImage = ({items}) => {
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {items && items?.length > 0 && items?.map((item) => <TheOrderDetailsImage id={item?.product_id} />)}
    </ScrollView>
  );
};
