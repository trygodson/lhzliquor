import {useState} from "react";
import {View, Text, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {useDispatch} from "react-redux";
import Remove from "../../assets/icons/remove.svg";
import {removeItemService, updateQuantityService} from "../../services/cart";
import {addToCart, decreaseCartQuantity, removeItemFromCart} from "../../store/slices/cart/cart";
import {cartCountAction} from "../../store/slices/cart/cartcountSlice";
import AppColors from "../../utils/ColorApp";
import {fonts} from "../../utils/constants";
import {customToast} from "../../utils/toast";

const EachItem = ({item, fetchCart}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(parseInt(item?.quantity));

  const updateQuantity = (d) => {
    setLoading(true);
    updateQuantityService(d)
      .then((res) => {
        if (res?.status === true) {
          setLoading(false);
          fetchCart();
          dispatch(cartCountAction());
        }
      })
      .catch((err) => {
        customToast("Error Updating Quantity");
        setLoading(false);
      });
  };

  const removeItem = (key) => {
    setLoading(true);

    removeItemService(key)
      .then((res) => {
        if (res.status === true) {
          setLoading(false);

          fetchCart();
          dispatch(cartCountAction());
        }
      })
      .catch((err) => {
        setLoading(false);

        customToast("Error Removing Item From Cart");
      });
  };
  return loading ? (
    <View style={{height: 150, width: "100%", justifyContent: "center", alignItems: "center", marginBottom: 20}}>
      <ActivityIndicator style={{width: "80%"}} color={AppColors.appGreen} />
    </View>
  ) : (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: AppColors.lightGray2,
        borderBottomWidth: 1,
        paddingBottom: 13,
        marginBottom: 20,
      }}
    >
      <View style={{backgroundColor: AppColors.grayBg, width: "28%", padding: 20, height: "80%"}}>
        <Image
          source={{uri: item?.product_image}}
          resizeMode={"cover"}
          style={{
            width: "100%",
            height: 100,
          }}
        />
      </View>

      <View style={{justifyContent: "center", flex: 1, paddingHorizontal: 7}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 9,
            paddingTop: 5,
          }}
        >
          <Text style={{fontSize: 15, fontFamily: fonts.Medium, color: AppColors.black}}>{item?.product_name}</Text>
          <TouchableOpacity onPress={() => removeItem(item?.key)} style={{}}>
            <Remove />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: AppColors.lightGray2,
            borderStyle: "dashed",
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: AppColors.black,
              textTransform: "uppercase",
              fontFamily: fonts.Bold,
            }}
          >
            Price
          </Text>

          <Text style={{fontSize: 17, color: "gray", fontFamily: fonts.Medium}}>${item?.product_price}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: AppColors.lightGray2,
            borderStyle: "dashed",
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: AppColors.black,
              textTransform: "uppercase",
              fontFamily: fonts.Bold,
            }}
          >
            Quantity
          </Text>

          <View
            style={{
              height: 35,
              flexDirection: "row",
              alignItems: "center",
              width: "46%",
              borderWidth: 1.4,
              borderRadius: 4,
              borderColor: AppColors.lightGray2,
            }}
          >
            <TouchableOpacity
              style={{
                width: "33%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRightColor: AppColors.lightGray2,
                borderRightWidth: 1,
              }}
              onPress={() => {
                // if (quantity > 0) {
                //   setQuantity((prev) => prev - 1);
                // }
                let dd = {};
                dd[item?.key] = parseInt(item?.quantity) - 1;

                updateQuantity({cart_data: dd});
              }}
            >
              <Text style={{color: "black", fontSize: 20, fontFamily: fonts.Bold}}>-</Text>
            </TouchableOpacity>
            <View style={{width: "33%", height: "100%", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "black", fontSize: 20, fontFamily: fonts.Bold}}>{item?.quantity}</Text>
            </View>
            <TouchableOpacity
              style={{
                width: "33%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderLeftColor: AppColors.lightGray2,
                borderLeftWidth: 1,
              }}
              onPress={() => {
                let dd = {};
                dd[item?.key] = parseInt(item?.quantity) + 1;

                updateQuantity({cart_data: dd});
              }}
            >
              <Text style={{color: "black", fontSize: 20, fontFamily: fonts.Bold}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 7,
            marginBottom: 7,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: AppColors.black,
              textTransform: "uppercase",
              fontFamily: fonts.Bold,
            }}
          >
            SUBTOTAL
          </Text>
          <Text style={{fontSize: 17, color: AppColors.appGreen, fontFamily: fonts.Medium}}>
            ${parseInt(item.line_subtotal)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export {EachItem};
