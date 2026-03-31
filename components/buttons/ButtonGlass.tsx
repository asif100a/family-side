import {
  ActivityIndicator,
  ButtonProps,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "@/constants/theme";
import Text from "@/lib/Text";

export default function ButtonGlass({
  text,
  style = "",
  onPress = () => {},
  children,
  activeOpacity = 0.7,
  buttonTextStyle = {},
  ref = undefined,
  hitSlop = {},
  loading = false,
  indicatorColor = Colors.commonColor.green || "#fff",
  disabled = false,
}: {
  style?: string;
  text?: string;
  onPress?: (e?: GestureResponderEvent) => void;
  children?: React.ReactNode;
  activeOpacity?: number;
  buttonTextStyle?: object;
  ref?: any;
  hitSlop?: any;
  loading?: boolean;
  indicatorColor?: string;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[
        tw`p-2 bg-[${Colors.commonColor.glass}] border border-t rounded-md border-[${Colors.commonColor.border}] ${style} justify-center items-center`,
      ]}
      hitSlop={hitSlop}
      disabled={disabled}
    >
      {children ? (
        children
      ) : (
        <Text
          weight="medium"
          style={[tw`text-white font-semibold text-lg`, buttonTextStyle]}
        >
          {loading ? (
            <ActivityIndicator size="large" color={indicatorColor} />
          ) : (
            text
          )}
        </Text>
      )}
    </TouchableOpacity>
  );
}
