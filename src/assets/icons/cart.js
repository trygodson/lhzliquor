import Svg, {Path, Circle} from "react-native-svg";

export const CartIcon = ({color}) => {
  return (
    <Svg width="40" height="42" viewBox="-5 -10 35 35" fill="none">
      <Circle cx="10" cy="19" r="1.6" stroke={color ?? "#000000"} />
      <Circle cx="17" cy="19" r="1.6" stroke={color ?? "#000000"} />
      <Path d="M3.5 4H5.5L9.00446 15H17" stroke={color ?? "#000000"} stroke-linecap="round" stroke-linejoin="round" />
      <Path
        d="M8.22445 12.5L6.29862 6.5H18.8063C19.1476 6.5 19.3885 6.83435 19.2806 7.15811L17.614 12.1581C17.5459 12.3623 17.3548 12.5 17.1396 12.5H8.22445Z"
        stroke={color ?? "#000000"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
