import {useEffect, useState} from "react";
import {ActivityIndicator, Image, View} from "react-native";
import {orderDetails} from "../../services/orders";
import {getProductsDetails} from "../../services/getProducts";
import AppColors from "../../utils/ColorApp";
import {customToast} from "../../utils/toast";

const OrderImage = ({id}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    orderDetails(id)
      .then((res) => {
        if (res?.status === true) {
          getProductsDetails({queries: res?.data?.items[0]?.product_id})
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
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        customToast(JSON.stringify(err));
      });
  }, []);
  return (
    <View style={{width: "40%", height: 150, justifyContent: "center", alignItems: "center"}}>
      {loading ? (
        <ActivityIndicator color={AppColors.appGreen} style={{width: 30, alignSelf: "center"}} />
      ) : (
        <Image source={{uri: data?.image}} style={{width: "100%", resizeMode: "contain", height: "100%"}} />
      )}
    </View>
  );
};
export default OrderImage;
