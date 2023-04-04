import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AppColors from "../utils/ColorApp";
import styled from "styled-components/native";
import {verticalScale} from "react-native-size-matters";
import {Platform} from "react-native";
import {Svg} from "react-native-svg";
import {CONSTANTS, fonts} from "../utils/constants";
import HomeStack from "./homeStack";
import {Text} from "react-native";
import ShopStack from "./shopStack";
import {CartIcon} from "../assets/icons/cart";
import {HeartIcon} from "../assets/icons/heart";
import {HomeIcon} from "../assets/icons/home";
import {UserIcon} from "../assets/icons/user";
import WishListScreen from "../screens/wishListScreen";
import AccountStack from "./AccountStack";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {cartCountAction} from "../store/slices/cart/cartcountSlice";

const Tab = createBottomTabNavigator();

const shouldBeCutOffHeight = Platform.OS === "android" ? 10 : 0;

// const IconHomeBar = styled(AppLogo)`
//   align-self: center;
//   position: absolute;
//   top: -${CONSTANTS.SPACE_8_VERTICAL}px;
// `;S
const IconHomeBarPolygon = styled(Svg)`
  position: absolute;
  width: ${CONSTANTS.SPACE_62_HORIZONTAL}px;
  height: ${CONSTANTS.SPACE_90_HORIZONTAL}px;
  bottom: 0px;
`;

const BottomTab = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartCountAction());
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        showLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: Math.round(verticalScale(65)) - shouldBeCutOffHeight,
          elevation: 1,
          paddingVertical: 5,
          paddingBottom: Math.round(verticalScale(5)),
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        component={HomeStack}
        name="HomeStack"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <HomeIcon color={focused ? AppColors.appGreen : AppColors.black} />

                <Text
                  style={{
                    color: focused ? AppColors.appGreen : AppColors.black,
                    fontSize: 11,
                    fontFamily: fonts.Regular,
                  }}
                >
                  Home
                </Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        component={WishListScreen}
        name="WishListScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <HeartIcon color={focused ? AppColors.appGreen : AppColors.black} />

                <Text
                  style={{
                    color: focused ? AppColors.appGreen : AppColors.black,
                    fontSize: 11,
                    fontFamily: fonts.Regular,
                  }}
                >
                  Wishlist
                </Text>
              </>
            );
          },
        }}
      />

      <Tab.Screen
        component={ShopStack}
        name="ShopScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                {/* <Svg
                  style={{zIndex: 1, color: AppColors.appGreen}}
                  width="50"
                  height="42"
                  viewBox={"-12 -14 50 42"}
                  stroke={AppColors.appGreen}
                  fill={AppColors.appGreen}
                >
                  <CartIcon />
                </Svg> */}

                <CartIcon color={focused ? AppColors.appGreen : AppColors.black} />
                <Text
                  style={{
                    color: focused ? AppColors.appGreen : AppColors.black,
                    fontSize: 11,
                    fontFamily: fonts.Regular,
                  }}
                >
                  Shop
                </Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        component={AccountStack}
        name="AccountStack"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <UserIcon color={focused ? AppColors.appGreen : AppColors.black} />
                <Text
                  style={{
                    color: focused ? AppColors.appGreen : AppColors.black,
                    fontSize: 11,
                    fontFamily: fonts.Regular,
                  }}
                >
                  Account
                </Text>
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
