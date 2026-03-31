import { ActivityIndicator, View } from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import tw from "twrnc";
import Text from "@/lib/Text";
import GlassBackground from "../glass_bg/GlassBackground";
import ModalContainer from "./_modalContainer/ModalContainer";

export default function LoadingModal({
  isOpen,
  setOpen,
  title = "Loading",
  description = "Loading the action...",
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  description?: string;
}) {
  return (
    <View>
      <ModalContainer
        visible={isOpen}
        setVisible={() => setOpen(false)}
      >
        <GlassBackground style="h-72 justify-center items-center">
          <ActivityIndicator size="large" color={"#fff"} style={tw`mx-auto`} />
          <View style={tw`mt-6`}>
            <Text style={tw`text-white text-sm font-semibold text-center mb-2`}>
              {title}
            </Text>

            <Text style={tw`text-white text-[16px] font-normal text-center`}>
              {description}
            </Text>
          </View>
        </GlassBackground>
      </ModalContainer>
    </View>
  );
}
