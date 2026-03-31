import { Image, View } from "react-native";
import React from "react";
import ModalContainer from "./_modalContainer/ModalContainer";
import check_box_icon from "@/assets/images/icons/check_box.png";
import { Text } from "../Themed";

export default function SuccessModal({
  isOpen,
  setOpen,
  title = "Verified",
  description = "Your code is verified",
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  description?: string;
}) {
  return (
    <ModalContainer visible={isOpen} setVisible={setOpen} className="max-w-[80%] w-full">
      <View className="w-full rounded-2xl bg-white px-6 py-8 items-center shadow-lg">
        <Image
          source={check_box_icon}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
        />
        <View className="mt-6">
          <Text className="text-2xl font-semibold text-center mb-2" style={{color: "#222"}}>
            {title}
          </Text>

          <Text className="text-base font-normal text-center" style={{color: "#666"}}>
            {description}
          </Text>
        </View>
      </View>
    </ModalContainer>
  );
}
