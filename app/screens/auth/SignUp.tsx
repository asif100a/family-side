import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import StandardInputField from "@/components/form_fields/StandardInputField";
import { useForm } from "react-hook-form";
import StandardButton from "@/components/buttons/StandardButton";
import StandardCheckbox from "@/components/form_fields/StandardCheckbox";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import FamilysideLogo from "@/assets/images/logo-white.png";

const BRAND = "#F0436F";

function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3 8l3.5 3.5L13 5"
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
    label: "A special character - # @ $ % & ! *",
    test: (pw) => /[#@$%&!*\-]/.test(pw),
  },
  { label: "A number", test: (pw) => /[0-9]/.test(pw) },
];

interface SignUpProps {
  onBack?: () => void;
  onContinue?: (password: string) => void;
}

export default function SignUp({
  onBack = () => {},
  onContinue = () => {},
}: SignUpProps) {
  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const isAgreeToTerms = watch("agreeToTerms");

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const canSubmit = allRulesPassed && passwordsMatch;

  const onSubmit = () => {
    if (canSubmit) {
      onContinue(password);
    }
  };

  const LOGO_WIDTH = 196;
  const LOGO_HEIGHT = 42;
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
            <View className="flex-row items-center gap-2 mb-8">
              <Image
                source={FamilysideLogo}
                style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
                contentFit="contain"
              />
            </View>

            <Text className="text-white text-[28px] font-bold mb-2 leading-9">
              Create a account
            </Text>
            <Text className="text-white/80 text-sm leading-5">
              Please create and enter a new password for your account.
            </Text>
          </View>

          {/* White card */}
          <View className="flex-1 bg-[#f5f5f5] rounded-t-[28px] px-6 pt-8 pb-10">
            {/* Name */}
            <StandardInputField
              control={control}
              label="Name"
              id="name"
              type="text"
              placeholder="Enter your name"
            />

            {/* Email */}
            <StandardInputField
              control={control}
              label="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
            />

            {/* Password */}
            <StandardInputField
              control={control}
              label="Password"
              id="password"
              type="password"
              placeholder="●●●●●●●●●●●●●●"
            />

            {/* Confirm Password */}
            <StandardInputField
              control={control}
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="●●●●●●●●●●●●●●"
            />

            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={() => setValue("agreeToTerms", !isAgreeToTerms)}
              activeOpacity={0.7}
            >
              <StandardCheckbox
                value={isAgreeToTerms}
                onValueChange={(e, value) => {
                  e.stopPropagation();
                  setValue("agreeToTerms", value);
                }}
              />
              <Text className="text-sm" style={{ color: "#555" }}>
                By agreeing to the{" "}
                <Link
                  href={"/screens/common/termsAndConditions"}
                  onPress={(e) => e.stopPropagation()}
                >
                  <Text
                    style={{ color: Colors.common.BRAND }}
                    className="underline"
                  >
                    Terms of Service
                  </Text>
                </Link>{" "}
                and{" "}
                <Link
                  href={"/screens/common/privacyPolicy"}
                  onPress={(e) => e.stopPropagation()}
                >
                  <Text
                    style={{ color: Colors.common.BRAND }}
                    className="underline"
                  >
                    Privacy Policy
                  </Text>
                </Link>
              </Text>
            </TouchableOpacity>

            {/* Password rules */}
            <View className="mb-8 mt-4">
              <Text
                className="text-sm font-semibold mb-3"
                style={{ color: "#333" }}
              >
                Password must include:
              </Text>
              <View className="gap-2">
                {PASSWORD_RULES.map((rule, i) => {
                  const passed = rule.test(password ?? "");
                  return (
                    <View key={i} className="flex-row items-center gap-2">
                      <CheckIcon checked={passed} />
                      <Text
                        className={`text-sm }`}
                        style={{ color: passed ? BRAND : "#888" }}
                      >
                        {rule.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Continue button */}
            <StandardButton text="Sign Up" onPress={handleSubmit(onSubmit)} className="mb-6" />

            <View className="flex-row justify-center">
              <Text className="text-sm" style={{ color: "#555" }}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/screens/auth/login")}
                activeOpacity={0.7}
              >
                <Text
                  className="text-sm font-bold underline"
                  style={{ color: "#222" }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
