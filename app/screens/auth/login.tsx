import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useForm } from "react-hook-form";

import FamilysideLogo from "@/assets/images/logo-white.png";
import { AppleIcon, GoogleIcon } from "@/assets/icons/Media";
import { Text } from "@/components/Themed";
import StandardInputField from "@/components/form_fields/StandardInputField";
import Button from "@/components/buttons/StandardButton";
import StandardButton from "@/components/buttons/StandardButton";

const BRAND = "#F0436F";

export type LoginFormValues = {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
};

interface LoginScreenProps {
  onLogin?: (values: LoginFormValues) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

export default function LoginScreen({
  onLogin = () => {},
  onForgotPassword = () => {},
  onSignUp = () => {},
  onGoogleLogin = () => {},
  onAppleLogin = () => {},
}: LoginScreenProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    },
  });

  const LOGO_WIDTH = 196;
  const LOGO_HEIGHT = 42;
  const rememberMe = watch("rememberMe");

  const onSubmit = (values: LoginFormValues) => {
    onLogin(values);
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
          <View className="px-6 pt-6 pb-10">
            <View className="flex-row items-center gap-2 mb-8">
              <Image
                source={FamilysideLogo}
                className={`w-[${LOGO_WIDTH}px] h-[${LOGO_HEIGHT}px]`}
                resizeMode="contain"
              />
            </View>

            <Text className="text-white text-[28px] font-bold mb-2 leading-9">
              Login to your account
            </Text>
            <Text className="text-white/80 text-sm leading-5">
              It is quick and easy to log in. Enter your email and password
              below.
            </Text>
          </View>

          <View className="flex-1 bg-[#f5f5f5] rounded-t-[28px] px-6 pt-8 pb-10">
            <StandardInputField<LoginFormValues>
              label="Email or Phone"
              id="emailOrPhone"
              control={control}
              type="text"
              placeholder="Enter your email or phone"
            />

            <StandardInputField<LoginFormValues>
              label="Password"
              id="password"
              control={control}
              type="password"
              placeholder="Enter your password"
            />

            <View className="flex-row items-center justify-between mb-7">
              <TouchableOpacity
                className="flex-row items-center gap-2"
                onPress={() => setValue("rememberMe", !rememberMe)}
                activeOpacity={0.7}
              >
                <View
                  className={`w-4 h-4 rounded border ${
                    rememberMe
                      ? "bg-[#F0436F] border-[#F0436F]"
                      : "bg-white border-[#ccc]"
                  } items-center justify-center`}
                >
                  {rememberMe ? (
                    <Svg width={10} height={10} viewBox="0 0 12 12" fill="none">
                      <Path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  ) : null}
                </View>
                <Text className="text-sm text-[#555]">Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
                <Text className="text-sm text-[#F0436F] font-medium">
                  Forget password
                </Text>
              </TouchableOpacity>
            </View>

            <StandardButton text="Login" onPress={handleSubmit(onSubmit)} />

            <View className="flex-row items-center gap-3 mb-6">
              <View className="flex-1 h-px bg-[#e0e0e0]" />
              <View className="w-8 h-8 rounded-full border border-dashed border-[#F0436F]/50 items-center justify-center">
                <Text className="text-xs text-[#F0436F]/70 font-medium">
                  Or
                </Text>
              </View>
              <View className="flex-1 h-px bg-[#e0e0e0]" />
            </View>

            <View className="flex-row gap-3 mb-8">
              <TouchableOpacity
                className="flex-1 h-[52px] rounded-xl border border-[#e8e8e8] bg-white flex-row items-center justify-center gap-2"
                onPress={onGoogleLogin}
                activeOpacity={0.8}
              >
                <GoogleIcon />
                <Text className="text-sm font-semibold text-[#333]">
                  Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 h-[52px] rounded-xl border border-[#e8e8e8] bg-white flex-row items-center justify-center gap-2"
                onPress={onAppleLogin}
                activeOpacity={0.8}
              >
                <AppleIcon />
                <Text className="text-sm font-semibold text-[#333]">Apple</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center">
              <Text className="text-sm text-[#888]">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={onSignUp} activeOpacity={0.7}>
                <Text className="text-sm text-[#222] font-bold underline">
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
