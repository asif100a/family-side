import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

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
  const [email, setEmail] = useState("");

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
            <TouchableOpacity
              className="flex-row items-center gap-1 mb-8"
              onPress={onBack}
              activeOpacity={0.7}
            >
              <ChevronLeftIcon />
              <Text className="text-white text-base font-medium">Back</Text>
            </TouchableOpacity>

            <Text className="text-white text-[28px] font-bold mb-2 leading-9">
              Forgot password
            </Text>
            <Text className="text-white/80 text-sm leading-5">
              Please enter your email address
            </Text>
          </View>

          {/* White card */}
          <View className="flex-1 bg-[#f5f5f5] rounded-t-[28px] px-6 pt-8 pb-10">
            <Text className="text-[#333] text-sm font-semibold mb-2">
              Email
            </Text>
            <View className="bg-white rounded-xl border border-[#e8e8e8] px-4 h-[52px] justify-center mb-8">
              <TextInput
                className="text-sm text-[#222] flex-1"
                placeholder="Enter your email"
                placeholderTextColor="#bbb"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Continue button */}
            <TouchableOpacity
              className="h-14 rounded-2xl bg-[#F0436F] items-center justify-center"
              style={{
                shadowColor: BRAND,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 6,
              }}
              onPress={() => onContinue(email)}
              activeOpacity={0.85}
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