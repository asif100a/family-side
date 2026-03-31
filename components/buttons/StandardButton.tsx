import {
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Text } from "../ui/text";

export default function StandardButton({
  text,
  onPress,
  className,
  loading,
  disabled,
  indicatorColor = Colors.common.SUCCESS || "#fff",
  buttonTextClassName = "",
}: {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  className?: string;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  indicatorColor?: string;
  buttonTextClassName?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => {}}
      activeOpacity={0.7}
      className={`w-full h-14 rounded-md justify-center items-center bg-[${Colors.common.BRAND}] ${className ?? ""}`}
      style={{ backgroundColor: Colors.common.BRAND }}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator size="large" color={indicatorColor} />
      ) : (
        <Text className={`text-lg font-bold text-center text-white ${buttonTextClassName}`}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
