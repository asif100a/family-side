import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { Text } from "../ui/text";
import { TouchableOpacity } from "react-native";

export default function BackButton({
  title = "Back",
  size = "base",
  onPress,
  className = "",
  textClassname = "",
  iconClassname = "",
}: {
  title?: string;
  size?: "base" | "lg";
  onPress?: () => void;
  className?: string;
  textClassname?: string;
  iconClassname?: string;
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : navigation.goBack())}
      className={`flex-row items-center ${className}`}
      activeOpacity={0.7}
    >
      <Ionicons
        name="chevron-back"
        size={18}
        color="white"
        className={iconClassname}
      />

      <Text
        className={`text-white text-base mb-[0.5px] ${size === "lg" ? "text-2xl" : "text-base"} ${textClassname}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
