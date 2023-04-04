import {StatusBar} from "react-native";
import {useIsFocused} from "@react-navigation/native";

const FocusAwareStatusBar = ({backgroundColor, barStyle, translucent}) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} translucent={translucent} />
  ) : null;
};

export {FocusAwareStatusBar};
