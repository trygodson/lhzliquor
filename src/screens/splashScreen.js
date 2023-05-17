import {StackActions, useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import {Text, View, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch} from "react-redux";
import {FocusAwareStatusBar} from "../components/common";
import Global from "../services/global";
import {setLogin} from "../store/slices/auth/loginSlice";
import {cartCountAction} from "../store/slices/cart/cartcountSlice";
import {getFeaturedCategoryAction} from "../store/slices/products/featuredCategory";
import {getFeaturedProductSliderAction} from "../store/slices/products/featuredProduct";
// import {getWishListItemsActions} from "../store/slices/wishlist/wishlist";
import AppColors from "../utils/ColorApp";
import {getUserAddressAction} from "../store/slices/userAddress/userAddress";

const SplashScreen = () => {
  const storedispatch = useDispatch();
  const {dispatch, navigate} = useNavigation();

  const performTimeConsumingTask = async () => {
    const token = await Global.getToken();
    return new Promise((resolve) =>
      setTimeout(() => {
        if (token === null) {
          storedispatch(setLogin(false));
          dispatch(StackActions.replace("AppStack", {}));
        } else {
          storedispatch(getUserAddressAction());
          storedispatch(setLogin(true));

          dispatch(StackActions.replace("AppStack", {}));
        }
      }, 3000)
    );
  };
  useEffect(() => {
    storedispatch(getFeaturedCategoryAction({}));
    storedispatch(getFeaturedProductSliderAction({data: "?page=1&featured=0"}));
    // storedispatch(getWishListItemsActions({}));
    performTimeConsumingTask();
  }, []);

  return (
    <View style={{height: "100%", width: "100%", backgroundColor: AppColors.mainBG}}>
      <SafeAreaView>
        <FocusAwareStatusBar barStyle={"dark-content"} translucent backgroundColor={"transparent"} />
        <View style={{justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
          {/* <Text style={{color: "black", fontSize: 34}}>LHZ LIQUOR</Text> */}
          <Image
            source={require("../assets/lhz-logo-sm.png")}
            style={{height: 80, width: "100%", resizeMode: "contain"}}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export {SplashScreen};
