import {TouchableOpacity} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {useNavigation, useRoute} from "@react-navigation/native";
import styled from "styled-components/native";
import GoBack from "../../../assets/icons/goback.svg";
import ShoppingBag from "../../../assets/icons/bag.svg";
import {CONSTANTS, fonts} from "../../../utils/constants";
import {Text, View, Image} from "react-native";
import {useSelector} from "react-redux";
import AppColors from "../../../utils/ColorApp";

const HeaderContainer = styled.View`
  height: ${getStatusBarHeight() - 10}px;
  width: 100%;
  padding: 4px 0px;
`;

const CustomHeader = () => {
  const {goBack} = useNavigation();
  const {name} = useRoute();
  return (
    <HeaderContainer>
      <TouchableOpacity onPress={() => goBack()}>
        <GoBack />
      </TouchableOpacity>
    </HeaderContainer>
  );
};
export const CustomHeader2 = ({title, shoppingBag = true}) => {
  const {goBack, navigate} = useNavigation();
  const {response} = useSelector((state) => state.cartCount);
  const {name} = useRoute();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: CONSTANTS.SPACE_54_VERTICAL,
        // borderBottomColor: "gray",
        // borderBottomWidth: 1,

        width: "100%",
        paddingHorizontal: CONSTANTS.SPACE_12_HORIZONTAL,
        elevation: 2,
        backgroundColor: "white",
      }}
    >
      <View style={{flexDirection: "row", alignItems: "center"}}>
        {name !== "HomeScreen" && (
          <TouchableOpacity onPress={() => goBack()} style={{marginRight: 10, width: 30, height: "80%"}}>
            <GoBack />
          </TouchableOpacity>
        )}
      </View>
      <Text style={{color: "black", fontSize: 22, fontWeight: "600"}}>{title ? title : "LHZ LIQUOR"}</Text>

      {shoppingBag ? (
        <TouchableOpacity
          onPress={() => navigate("CartScreen")}
          // onPress={() => navigate("SuccessScreen")}
        >
          {response !== null && parseInt(response) > 0 && (
            <View
              style={{
                position: "absolute",
                top: -4,
                right: 0,
                width: 16,
                height: 16,
                borderRadius: 16 / 2,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: AppColors.appGreen,
                zIndex: 2,
              }}
            >
              <Text style={{fontSize: 12, color: "white", fontFamily: fonts.Bold}}>{`${response}`}</Text>
            </View>
          )}
          <ShoppingBag />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export {CustomHeader};
