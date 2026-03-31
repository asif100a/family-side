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
import Svg, { Path, Line } from "react-native-svg";
import BackButton from "@/components/buttons/BackButton";
import StandardInputField from "@/components/form_fields/StandardInputField";
import { useForm } from "react-hook-form";
import StandardButton from "@/components/buttons/StandardButton";
import SuccessModal from "@/components/modals/SuccessModal";
import { router } from "expo-router";

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

interface CreateNewPasswordScreenProps {
  onBack?: () => void;
  onContinue?: (password: string) => void;
}

export default function CreateNewPasswordScreen({
  onBack = () => {},
  onContinue = () => {},
}: CreateNewPasswordScreenProps) {
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [isSuccessModalOpen, setSuccessModalOpen] = React.useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const canSubmit = allRulesPassed && passwordsMatch;

  const onSubmit = () => {

    setSuccessModalOpen(true);

    // Simulate API call and close modal after 2 seconds
    setTimeout(() => {
      setSuccessModalOpen(false);
      // router.push("/screens/auth/createNewPassword");
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
          {/* Pink header */}
          <View className="px-6 pt-4 pb-10">
            <BackButton className="mb-4" />

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
            <StandardInputField
              control={control}
              label="New Password"
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

            {/* Password rules */}
            <View className="mb-8">
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
            <StandardButton text="Continue" onPress={handleSubmit(onSubmit)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        setOpen={setSuccessModalOpen}
        title="Successful"
        description="Your password is successfully Created"
      />
    </SafeAreaView>
  );
}
