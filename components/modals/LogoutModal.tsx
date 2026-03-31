import { View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "@/constants/theme";
import Text from "@/lib/Text";
import Button from "../utils/buttons/Button";
import { AntDesign } from "@expo/vector-icons";
import ModalContainer from "./_modalContainer/ModalContainer";
import { useLogoutMutation } from "@/store/api/authApi";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export default function LogoutModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();

      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Logout successful",
        });
        setOpen(false);
        router.push("/auth/loginScreen");
      }
    } catch (error: any) {
      console.error("❌ Error while logging out: ", error);
      Toast.show({
        type: "error",
        text1: "Logout Failed",
        text2: error?.data?.message,
      });
    }
  };

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
              <AntDesign name="logout" size={28} color="#E53935" />
            </View>
            <View style={tw`mt-6`}>
              <Text style={tw`text-white text-[16px] font-normal text-center`}>
                You will be signed out of your account.
              </Text>
              <Text style={tw`text-white text-[16px] font-normal text-center`}>
                Your data will remain safely stored.
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-4 mt-4`}>
              <Button
                title="Cancel"
                style={tw`flex-1`}
                onPress={() => setOpen(false)}
              />
              <Button
                title="Log Out"
                onPress={handleLogout}
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
