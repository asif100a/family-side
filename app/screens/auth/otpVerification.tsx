import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const BRAND = "#F0436F";
const OTP_LENGTH = 6;

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

interface OTPScreenProps {
  email?: string;
  onBack?: () => void;
  onContinue?: (otp: string) => void;
  onResend?: () => void;
}

export default function OTPScreen({
  email = "shahidhasn@gmail.com",
  onBack = () => {},
  onContinue = () => {},
  onResend = () => {},
}: OTPScreenProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));

  const handleChange = (value: string, index: number) => {
    // Only allow single digit
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const isComplete = otp.every((d) => d !== "");

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
            <TouchableOpacity
              className="flex-row items-center gap-1 mb-8"
              onPress={onBack}
              activeOpacity={0.7}
            >
              <ChevronLeftIcon />
              <Text className="text-white text-base font-medium">Back</Text>
            </TouchableOpacity>

            <Text className="text-white text-[28px] font-bold mb-2 leading-9">
              Verify your email
            </Text>
            <Text className="text-white/80 text-sm leading-5">
              To confirm your account, enter the 6-digit code we sent{"\n"}to{" "}
              <Text className="text-white font-semibold">{email}</Text>
            </Text>
          </View>

          {/* White card */}
          <View className="flex-1 bg-[#f5f5f5] rounded-t-[28px] px-6 pt-8 pb-10">
            <Text className="text-[#333] text-sm font-semibold mb-4">
              Enter OTP
            </Text>

            {/* OTP boxes */}
            <View className="flex-row gap-2.5 mb-4">
              {otp.map((digit, index) => (
                <View
                  key={index}
                  className={`flex-1 h-14 rounded-xl border-[1.5px] bg-white items-center justify-center ${
                    digit
                      ? "border-[#F0436F]"
                      : "border-[#e0e0e0]"
                  }`}
                >
                  <TextInput
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    className="text-center text-xl font-bold text-[#222] w-full h-full"
                    value={digit}
                    onChangeText={(val) => handleChange(val, index)}
                    onKeyPress={({ nativeEvent }) =>
                      handleKeyPress(nativeEvent.key, index)
                    }
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                </View>
              ))}
            </View>

            {/* Resend */}
            <View className="flex-row justify-end mb-8">
              <Text className="text-sm text-[#888]">Didn't get code? </Text>
              <TouchableOpacity onPress={onResend} activeOpacity={0.7}>
                <Text className="text-sm text-[#222] font-bold underline">
                  Resend
                </Text>
              </TouchableOpacity>
            </View>

            {/* Continue button */}
            <TouchableOpacity
              className={`h-14 rounded-2xl items-center justify-center ${
                isComplete ? "bg-[#F0436F]" : "bg-[#F0436F]/50"
              }`}
              style={
                isComplete
                  ? {
                      shadowColor: BRAND,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 12,
                      elevation: 6,
                    }
                  : undefined
              }
              onPress={() => isComplete && onContinue(otp.join(""))}
              activeOpacity={isComplete ? 0.85 : 1}
            >
              <Text className="text-white text-base font-bold tracking-wide">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}