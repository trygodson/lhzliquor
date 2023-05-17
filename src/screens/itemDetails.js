import {useState, useEffect} from "react";
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import Carousel, {Pagination} from "react-native-new-snap-carousel";
import RenderHTML from "react-native-render-html";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import Share from "react-native-share";
import {HeartIcon2, HeartIconFilled2} from "../assets/icons/heart2";
import {CustomHeader2, Loader, Loader2} from "../components/common";
import {CarouselItemPicture, ItemMetaDetails} from "../components/itemDetails";
import FaceBookIcon from "../assets/icons/fbsmall.svg";
import WhatsAppIcon from "../assets/icons/whatsapp.svg";
import InstagramIcon from "../assets/icons/instagram.svg";
import {getProductDetailsAction} from "../store/slices/products/productDetails";
import {addToWishList} from "../store/slices/wishlist/wishlist";
import AppColors from "../utils/ColorApp";
import {fonts} from "../utils/constants";
import {customToast} from "../utils/toast";
import Global from "../services/global";
import {addtocart} from "../services/cart";
import {cartCountAction} from "../store/slices/cart/cartcountSlice";
import {navigationRef} from "../Main";

const ItemDetails = ({route}) => {
  let id = route.params.id;
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const [itemNumber, setItemNumber] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const {response, loading} = useSelector((state) => state.getProductDetails);
  const {wishlist} = useSelector((state) => state.wishList);

  useEffect(() => {
    dispatch(getProductDetailsAction({data: id}));
  }, [id]);

  const handleAddToCart = async () => {
    // dispatch(addToCart({...response, quantity: itemNumber}));
    const token = await Global.getToken();
    if (token === null) {
      navigationRef.navigate("LoginScreen");
    } else {
      setButtonDisable(true);
      addtocart({
        product_id: id,
        quantity: parseInt(itemNumber),
      })
        .then((res) => {
          console.log(res, "------response ------");
          if (res.status === true) {
            setButtonDisable(false);
            dispatch(cartCountAction());
            setItemNumber(0);
            customToast(res?.message);
          } else {
            customToast(res?.message, "---error adding to cart tttt----");
            setButtonDisable(false);
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err), "---error adding to cart----");
          setButtonDisable(false);
        });
    }
  };

  const onShareWhatsapp = () => {
    Share.shareSingle({
      social: Share.Social.WHATSAPP,

      title: "LHZLIQUOR",
      url: `https://lhzliquor.com/product/${response?.name}`,
    })
      .then((res) => {
        console.log(res, "share opened");
      })
      .catch((err) => {
        Share.open({
          title: "LHZLIQUOR",
          url: `https://lhzliquor.com/product/${response?.name}`,
        })
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      });
  };
  const onShareFacebook = () => {
    Share.shareSingle({
      social: Share.Social.FACEBOOK,
      title: "LHZLIQUOR",
      url: `https://lhzliquor.com/product/${response?.name}`,
    })
      .then((res) => {
        console.log(res, "share opened");
      })
      .catch((err) => {
        Share.open({
          title: "LHZLIQUOR",
          url: `https://lhzliquor.com/product/${response?.name}`,
        })
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      });
  };
  const onShareInstagram = () => {
    Share.shareSingle({
      social: Share.Social.INSTAGRAM_STORIES,
      title: "LHZLIQUOR",
      url: `https://lhzliquor.com/product/${response?.name}`,
    })
      .then((res) => {
        console.log(res, "share opened");
      })
      .catch((err) => {
        Share.open({
          title: "LHZLIQUOR",
          url: `https://lhzliquor.com/product/${response?.name}`,
        })
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      });
  };

  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader2 />
        <ScrollView style={{}}>
          {loading ? (
            <View style={{height: height * 0.8, width, justifyContent: "center", alignItems: "center"}}>
              <Loader2 />
            </View>
          ) : (
            response && (
              <>
                <View style={{width: width}}>
                  <Carousel
                    data={[response?.image]}
                    renderItem={({item, index}) => <CarouselItemPicture image={item} />}
                    sliderWidth={width}
                    itemWidth={width}
                    onSnapToItem={(index) => setSliderIndex(index)}
                    bounces={false}
                  />
                  {/* <Pagination
                    dotsLength={1}
                    activeDotIndex={sliderIndex}
                    containerStyle={{position: "absolute", bottom: "-10%", right: 0, left: 0}}
                    dotStyle={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      marginHorizontal: 8,
                      backgroundColor: "#333333",
                    }}
                    inactiveDotStyle={
                      {
                        // Define styles for inactive dots here
                      }
                    }
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                  /> */}
                </View>
                <View style={{padding: 10}}>
                  <View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <Text style={{fontSize: 22, color: AppColors.appGreen, fontFamily: fonts.Regular}}>
                        ${response?.regular_price}
                      </Text>

                      <TouchableOpacity onPress={() => dispatch(addToWishList(response))}>
                        <View style={{flexDirection: "row", alignItems: "center", marginLeft: 40}}>
                          {wishlist && wishlist?.find((item) => item?.name === response?.name) ? (
                            <HeartIconFilled2 color={"#ff1a1a"} />
                          ) : (
                            <HeartIcon2 color={"#ff1a1a"} />
                          )}
                          <Text style={{color: AppColors.black, fontSize: 14, fontFamily: fonts.Light, marginLeft: 10}}>
                            {wishlist && wishlist?.find((item) => item?.name === response?.name)
                              ? "Remove from Wishlist"
                              : "Add to Wishlist"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 28, color: AppColors.black, fontFamily: fonts.Black, width: "74%"}}>
                      {response?.name}
                    </Text>
                    {/* <Text style={{fontSize: 22, color: AppColors.black, fontFamily: fonts.Medium, marginVertical: 5}}>
                      {response?.name}
                    </Text> */}
                    <RenderHTML
                      contentWidth={50}
                      baseStyle={{
                        color: AppColors.black,
                        fontSize: 15,
                        textAlign: "center",
                        fontFamily: fonts.SemiBold,
                      }}
                      source={{html: response ? response?.short_description : `<b></b>`}}
                    />

                    {/* <Text style={{fontSize: 18, color: AppColors.black, fontFamily: fonts.Light, marginBottom: 10}}>
                    Placerat tempor dolor eu leo ullamcorper et magnis habitant ultrices consectetur arcu nulla mattis
                    fermentum adipiscing a et bibendum sed platea malesuada eget vestibulum.
                  </Text> */}
                  </View>

                  {/* Add To Cart Area */}
                  <View
                    style={{
                      marginVertical: 10,
                      width: "100%",
                      borderBottomColor: AppColors.lightGray2,
                      borderBottomWidth: 1,
                      paddingBottom: 14,
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          height: 50,
                          flexDirection: "row",
                          alignItems: "center",
                          width: "40%",
                          borderWidth: 1,
                          borderRadius: 4,
                          borderColor: AppColors.lightGray2,
                          marginRight: 20,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "28%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRightColor: AppColors.lightGray2,
                            borderRightWidth: 1,
                          }}
                          onPress={() => {
                            if (itemNumber > 0) {
                              setItemNumber((prev) => prev - 1);
                            }
                          }}
                        >
                          <Text style={{color: "black", fontSize: 20, fontFamily: fonts.Bold}}>-</Text>
                        </TouchableOpacity>
                        <View style={{width: "44%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                          <Text style={{color: "black", fontSize: 20, fontFamily: fonts.Bold}}>{itemNumber}</Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            width: "28%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderLeftColor: AppColors.lightGray2,
                            borderLeftWidth: 1,
                          }}
                          onPress={() => setItemNumber((prev) => prev + 1)}
                        >
                          <Text style={{color: "black", fontSize: 20, fontFamily: fonts.Bold}}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: AppColors.appGreen,
                          height: 50,
                          width: "44%",
                          color: "white",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 4,
                          opacity: itemNumber === 0 || buttonDisable ? 0.4 : 1,
                        }}
                        disabled={itemNumber === 0 || buttonDisable}
                        onPress={() => handleAddToCart()}
                      >
                        {buttonDisable ? (
                          <ActivityIndicator color={"white"} style={{width: "50%"}} />
                        ) : (
                          <Text
                            style={{
                              fontSize: 20,
                              fontFamily: fonts.SemiBold,
                              color: "white",
                            }}
                          >
                            Add To Cart
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                      <Text
                        style={{fontSize: 14, fontFamily: fonts.Medium, color: AppColors.appGreen, marginRight: 22}}
                      >
                        Share Now
                      </Text>
                      <TouchableOpacity style={{marginRight: 12}} onPress={() => onShareFacebook()}>
                        <FaceBookIcon />
                      </TouchableOpacity>
                      <TouchableOpacity style={{marginRight: 12}} onPress={() => onShareWhatsapp()}>
                        <WhatsAppIcon />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => onShareInstagram()}>
                        <InstagramIcon />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{justifyContent: "flex-start", flexDirection: "row", marginBottom: 20}}>
                    <TouchableOpacity
                      style={
                        tab === 1 && {
                          borderBottomColor: AppColors.black,
                          borderBottomWidth: 3,
                          paddingBottom: 5,
                          marginRight: 10,
                        }
                      }
                      onPress={() => setTab(1)}
                    >
                      <Text
                        style={{
                          color: tab === 1 ? AppColors.black : AppColors.lightGray,
                          fontSize: 16,
                          fontFamily: fonts.Bold,
                        }}
                      >
                        Description
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        tab === 2 && {
                          borderBottomColor: AppColors.black,
                          borderBottomWidth: 3,
                          paddingBottom: 5,
                          marginLeft: 10,
                        }
                      }
                      onPress={() => setTab(2)}
                    >
                      <Text
                        style={{
                          color: tab === 2 ? AppColors.black : AppColors.lightGray,
                          fontSize: 16,
                          fontFamily: fonts.Bold,
                        }}
                      >
                        Additional Info
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {tab === 1 ? (
                    <View style={{marginBottom: 20}}>
                      <Text style={{fontFamily: fonts.Light, fontSize: 17, color: AppColors.black, marginBottom: 10}}>
                        {response?.description === "" ? "No Description Available" : response?.description}
                      </Text>
                    </View>
                  ) : (
                    tab === 2 && (
                      <View style={{marginBottom: 20}}>
                        <Text style={{fontFamily: fonts.Light, fontSize: 17, color: AppColors.black, marginBottom: 10}}>
                          {response?.short_description === ""
                            ? "No Additional Information Available"
                            : response?.short_description}
                        </Text>
                      </View>
                    )
                  )}

                  {/* <ItemMetaDetails id={response?.categories} /> */}
                </View>
              </>
            )
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export {ItemDetails};
