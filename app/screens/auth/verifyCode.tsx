import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";

import { Text } from "@/components/Themed";
import BackButton from "@/components/buttons/BackButton";
import StandardButton from "@/components/buttons/StandardButton";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { OtpInput } from "react-native-otp-entry";

const OTP_LENGTH = 6;

type VerifyCodeFormValues = {
  otp: string[];
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
  const inputRefs = useRef<Array<{ focus: () => void } | null>>(
    Array(OTP_LENGTH).fill(null),
  );

  const { control, handleSubmit, watch } = useForm<VerifyCodeFormValues>({
    defaultValues: {
      otp: Array(OTP_LENGTH).fill(""),
    },
  });

  const otpValues = watch("otp");
  const isComplete = otpValues.every((digit) => digit !== "");

  const handleOtpSubmit = ({ otp }: VerifyCodeFormValues) => {
    onContinue(otp.join(""));
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
            <Controller
              control={control}
              name="otp"
              rules={{
                validate: (value) =>
                  value.every((digit) => digit !== "") ||
                  "Please enter the full 6-digit code.",
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => {
                const otp = value ?? Array(OTP_LENGTH).fill("");

                const updateDigit = (text: string, index: number) => {
                  const digit = text.replace(/[^0-9]/g, "").slice(-1);
                  const nextOtp = [...otp];
                  nextOtp[index] = digit;
                  onChange(nextOtp);

                  if (digit && index < OTP_LENGTH - 1) {
                    inputRefs.current[index + 1]?.focus();
                  }
                };

                const handleBackspace = (key: string, index: number) => {
                  if (key !== "Backspace") {
                    return;
                  }

                  if (otp[index]) {
                    const nextOtp = [...otp];
                    nextOtp[index] = "";
                    onChange(nextOtp);
                    return;
                  }

                  if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                    const nextOtp = [...otp];
                    nextOtp[index - 1] = "";
                    onChange(nextOtp);
                  }
                };

                return (
                  <FormControl isInvalid={Boolean(error)} className="mb-8">
                    <FormControlLabel className="mb-4">
                      <FormControlLabelText className="text-[#333] text-sm font-semibold">
                        Enter OTP
                      </FormControlLabelText>
                    </FormControlLabel>

                    <OtpInput
                      numberOfDigits={6}
                      onTextChange={(text) => setOtp(text)}
                      focusColor={"white"}
                      theme={{
                        pinCodeTextStyle: { color: "white" },
                        pinCodeContainerStyle: {
                          borderColor: "transparent",
                          borderBottomColor: "white",
                          borderRadius: 0,
                        },
                        focusedPinCodeContainerStyle: {
                          borderColor: "transparent",
                          borderBottomColor: "white",
                          borderRadius: 0,
                        },
                      }}
                    />
                    {/* <View className="flex-row gap-2.5 mb-4">
                      {otp.map((digit, index) => (
                        <Input
                          key={index}
                          variant="outline"
                          size="xl"
                          className={`flex-1 h-14 rounded-xl bg-white ${
                            digit ? "border-[#F0436F]" : "border-[#e0e0e0]"
                          }`}
                        >
                          <InputField
                            ref={(ref) => {
                              inputRefs.current[index] = ref as unknown as {
                                focus: () => void;
                              } | null;
                            }}
                            value={digit}
                            onBlur={onBlur}
                            onChangeText={(text) => updateDigit(text, index)}
                            onKeyPress={({ nativeEvent }) =>
                              handleBackspace(nativeEvent.key, index)
                            }
                            keyboardType="number-pad"
                            returnKeyType="done"
                            maxLength={1}
                            textAlign="center"
                            autoCapitalize="none"
                            className="text-xl font-bold text-[#222] px-0"
                          />
                        </Input>
                      ))}
                    </View> */}

                    {error?.message ? (
                      <FormControlError>
                        <FormControlErrorText className="text-xs text-[#d92d20]">
                          {error.message}
                        </FormControlErrorText>
                      </FormControlError>
                    ) : null}
                  </FormControl>
                );
              }}
            />

            <View className="flex-row justify-end mb-8">
              <Text className="text-sm text-[#888]">Didn't get code? </Text>
              <TouchableOpacity onPress={onResend} activeOpacity={0.7}>
                <Text className="text-sm text-[#222] font-bold underline">
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
    </SafeAreaView>
  );
}
