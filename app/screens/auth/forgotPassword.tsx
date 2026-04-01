import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import BackButton from "@/components/buttons/BackButton";
import StandardInputField from "@/components/form_fields/StandardInputField";
import { useForm } from "react-hook-form";
import StandardButton from "@/components/buttons/StandardButton";
import { router } from "expo-router";

const BRAND = "#F0436F";

function ChevronLeftIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface ForgotPasswordScreenProps {
  onBack?: () => void;
  onContinue?: (email: string) => void;
}

export default function ForgotPasswordScreen({
  onBack = () => {},
  onContinue = () => {},
}: ForgotPasswordScreenProps) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleContinue = (data: { email: string }) => {
    onContinue(data.email);
    router.push("/screens/auth/verifyCode");
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F0436F]" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Pink header */}
          <View className="px-6 pt-4 pb-10">
            {/* Back button */}
            <BackButton className="mb-4" />

            <Text className="text-white text-[28px] font-bold mb-2 leading-9">
              Forgot password
            </Text>
            <Text className="text-white/80 text-sm leading-5">
              Please enter your email address
            </Text>
          </View>

          {/* White card */}
          <View className="flex-1 bg-[#f5f5f5] rounded-t-[28px] px-6 pt-8 pb-10">
            <StandardInputField
              control={control}
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            {/* Continue button */}
            <StandardButton text="Continue" onPress={handleSubmit(handleContinue)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
