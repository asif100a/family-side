import React, { useState } from "react";
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
import Svg, { Path, Line } from "react-native-svg";

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

function EyeOffIcon({ color = "#bbb" }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="2"
        y1="2"
        x2="22"
        y2="22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d={checked ? "M3 8l3.5 3.5L13 5" : "M3 8l3.5 3.5L13 5"}
        stroke={checked ? BRAND : "#ccc"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface Rule {
  label: string;
  test: (pw: string) => boolean;
}

const PASSWORD_RULES: Rule[] = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  {
    label: "Capital and lowercase letters",
    test: (pw) => /[A-Z]/.test(pw) && /[a-z]/.test(pw),
  },
  {
    label: "A special character - # @ $ % & ! * OA–",
    test: (pw) => /[#@$%&!*\-]/.test(pw),
  },
  { label: "A number", test: (pw) => /[0-9]/.test(pw) },
];

interface CreateNewPasswordScreenProps {
  onBack?: () => void;
  onContinue?: (password: string) => void;
}

export default function CreateNewPasswordScreen({
  onBack = () => {},
  onContinue = () => {},
}: CreateNewPasswordScreenProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const canSubmit = allRulesPassed && passwordsMatch;

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
              Create a new password
            </Text>
            <Text className="text-white/80 text-sm leading-5">
              Please create and enter a new password for your account.
            </Text>
          </View>

          {/* White card */}
          <View className="flex-1 bg-[#f5f5f5] rounded-t-[28px] px-6 pt-8 pb-10">
            {/* New Password */}
            <Text className="text-[#333] text-sm font-semibold mb-2">
              New Password
            </Text>
            <View className="bg-white rounded-xl border border-[#e8e8e8] px-4 h-[52px] flex-row items-center mb-5">
              <TextInput
                className="text-sm text-[#222] flex-1"
                placeholder="••••••••••••"
                placeholderTextColor="#ccc"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="pl-2"
              >
                <EyeOffIcon color={showPassword ? BRAND : "#bbb"} />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <Text className="text-[#333] text-sm font-semibold mb-2">
              New Confirm Password
            </Text>
            <View
              className={`bg-white rounded-xl border px-4 h-[52px] flex-row items-center mb-5 ${
                confirmPassword && !passwordsMatch
                  ? "border-red-400"
                  : "border-[#e8e8e8]"
              }`}
            >
              <TextInput
                className="text-sm text-[#222] flex-1"
                placeholder="••••••••••••"
                placeholderTextColor="#ccc"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
                className="pl-2"
              >
                <EyeOffIcon color={showConfirm ? BRAND : "#bbb"} />
              </TouchableOpacity>
            </View>

            {/* Password rules */}
            <View className="mb-8">
              <Text className="text-[#333] text-sm font-semibold mb-3">
                Password must include:
              </Text>
              <View className="gap-2">
                {PASSWORD_RULES.map((rule, i) => {
                  const passed = rule.test(password);
                  return (
                    <View key={i} className="flex-row items-center gap-2">
                      <CheckIcon checked={passed} />
                      <Text
                        className={`text-sm ${
                          passed ? "text-[#F0436F]" : "text-[#888]"
                        }`}
                      >
                        {rule.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Continue button */}
            <TouchableOpacity
              className={`h-14 rounded-2xl items-center justify-center ${
                canSubmit ? "bg-[#F0436F]" : "bg-[#F0436F]/50"
              }`}
              style={
                canSubmit
                  ? {
                      shadowColor: BRAND,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 12,
                      elevation: 6,
                    }
                  : undefined
              }
              onPress={() => canSubmit && onContinue(password)}
              activeOpacity={canSubmit ? 0.85 : 1}
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