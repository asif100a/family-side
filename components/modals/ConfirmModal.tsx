import { View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "@/constants/theme";
import Text from "@/lib/Text";
import Button from "../utils/buttons/Button";
import ModalContainer from "./_modalContainer/ModalContainer";
import { MaterialIcons } from "@expo/vector-icons";

export default function ConfirmModal({
  isOpen,
  setOpen,
  title = "Are you sure?",
  description = "This action will not be revoked.",
  confirmText = "Yes",
  cancelText = "No",
  onConfirm = () => {},
  onCancel = () => {},
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
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
            <View style={tw`mx-auto`}>
              <MaterialIcons name="info" size={48} color="#E53935" />
            </View>
            <View style={tw`mt-4`}>
              <Text style={tw`text-white text-xl font-normal text-center`}>
                {title}
              </Text>
              <Text
                style={tw`text-white/80 text-sm font-normal text-center mt-2`}
              >
                {description}
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-4 mt-6`}>
              <Button
                title={cancelText}
                style={tw`flex-1`}
                onPress={() => {
                  onCancel?.();
                  setOpen(false);
                }}
              />
              <Button
                title={confirmText}
                onPress={() => {
                  onConfirm?.();
                  setOpen(false);
                }}
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
