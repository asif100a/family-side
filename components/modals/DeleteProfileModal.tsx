import { View } from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import tw from "twrnc";
import { Colors } from "@/constants/theme";
import Text from "@/lib/Text";
import Button from "../utils/buttons/Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ModalContainer from "./_modalContainer/ModalContainer";

export default function DeleteProfileModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <View>
      <ModalContainer visible={isOpen} setVisible={setOpen}>
        <View
          style={tw`bg-black/50 border border-[${Colors.commonColor.border}] rounded-lg`}
        >
          <View
            style={[
              tw`p-5 w-full`,
              { backgroundColor: Colors.commonColor.glass, borderRadius: 8 },
            ]}
          >
            <View style={tw`p-4 bg-white rounded-full mx-auto`}>
              <MaterialIcons name="delete-outline" size={28} color="#E53935" />
            </View>
            <View style={tw`mt-6`}>
              <Text style={tw`text-white text-[16px] font-normal text-center`}>
                This action will permanently delete your Myne profile, including
                your collection, Wishlist and saved data. This cannot be undone.
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-4 mt-4`}>
              <Button
                title="Keep Profile"
                style={tw`flex-1`}
                onPress={() => setOpen(false)}
              />
              <Button
                title="Delete Profile"
                style={tw`flex-1 bg-[#E53935]`}
                buttonTextStyle={tw`text-white`}
              />
            </View>
          </View>
        </View>
      </ModalContainer>
    </View>
  );
}
