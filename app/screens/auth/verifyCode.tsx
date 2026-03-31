import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { Text } from "@/components/Themed";
import BackButton from "@/components/buttons/BackButton";
import StandardButton from "@/components/buttons/StandardButton";
import StandardOTPFields from "@/components/form_fields/StandardOTPFields";
import SuccessModal from "@/components/modals/SuccessModal";
import { router } from "expo-router";

const OTP_LENGTH = 6;

type VerifyCodeFormValues = {
  otp: string;
};

interface VerifyCodeScreenProps {
  email?: string;
  onBack?: () => void;
  onContinue?: (otp: string) => void;
  onResend?: () => void;
}

export default function VerifyCodeScreen({
  email = "shahidhasn@gmail.com",
  onBack,
  onContinue = () => {},
  onResend = () => {},
}: VerifyCodeScreenProps) {
  const { control, handleSubmit, watch } = useForm<VerifyCodeFormValues>({
    defaultValues: {
      otp: "",
    },
  });

  const [isSuccessModalOpen, setSuccessModalOpen] = React.useState(false);

  const otpValues = watch("otp");
  const isComplete = otpValues.length === OTP_LENGTH;

  const handleOtpSubmit = ({ otp }: VerifyCodeFormValues) => {
    onContinue(otp);

    setSuccessModalOpen(true);

    // Simulate API call and close modal after 2 seconds
    setTimeout(() => {
      setSuccessModalOpen(false);
      router.push('/screens/auth/createNewPassword')
    }, 2500);
  };

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
          <View className="px-6 pt-4 pb-10">
            <BackButton className="mb-4" onPress={onBack} />

            <Text className="text-white text-[28px] font-bold mb-2 leading-9">
              Verify your email
            </Text>
            <Text className="text-white/80 text-sm leading-5">
              To confirm your account, enter the 6-digit code we sent{"\n"}to{" "}
              <Text className="text-white font-semibold">{email}</Text>
            </Text>
          </View>

          <View className="flex-1 bg-[#f5f5f5] rounded-t-[28px] px-6 pt-8 pb-10">
            <StandardOTPFields control={control} />

            <View className="flex-row justify-end mb-8">
              <Text className="text-sm" style={{ color: "#888" }}>
                Didn't get code?
              </Text>
              <TouchableOpacity onPress={onResend} activeOpacity={0.7}>
                <Text
                  className="text-sm font-bold underline ml-1"
                  style={{ color: "#222" }}
                >
                  Resend
                </Text>
              </TouchableOpacity>
            </View>

            <StandardButton
              text="Continue"
              onPress={handleSubmit(handleOtpSubmit)}
              disabled={!isComplete}
              className={!isComplete ? "opacity-50" : ""}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        setOpen={setSuccessModalOpen}
        title="Congratulations"
        description="Your code is verified"
      />
    </SafeAreaView>
  );
}
