// OnboardingScreens.tsx
// Requires: NativeWind v4, React Navigation, @expo/vector-icons or react-native-vector-icons
// Install: npm install nativewind react-native-vector-icons

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen =
  | "ParentType"
  | "ChildInfo"
  | "ChildInfoExpanded"
  | "Interests"
  | "ProfilePicture";

// ─── Icons (SVG-free, emoji + unicode fallback) ───────────────────────────────

const BackArrow = () => (
  <Text className="text-gray-400 text-2xl leading-none">‹</Text>
);

const CheckIcon = () => (
  <Text className="text-pink-500 text-base font-bold">✓</Text>
);

const PinIcon = () => <Text className="text-pink-500 text-lg">📍</Text>;

const CalendarIcon = () => <Text className="text-gray-400 text-base">📅</Text>;

const PlusIcon = () => (
  <Text className="text-pink-500 text-base font-semibold">＋</Text>
);

const EditIcon = () => <Text className="text-gray-400 text-sm">✏️</Text>;

// ─── Shared Components ────────────────────────────────────────────────────────

interface StatusBarProps {}
const FakeStatusBar: React.FC<StatusBarProps> = () => (
  <View className="flex-row justify-between items-center px-1 pt-1 pb-0">
    <Text className="text-gray-900 font-semibold text-sm">11:30</Text>
    <View className="flex-row gap-x-1 items-center">
      <Text className="text-gray-900 text-xs">▊▊▊</Text>
      <Text className="text-gray-900 text-xs">WiFi</Text>
      <Text className="text-gray-900 text-xs">🔋</Text>
    </View>
  </View>
);


interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className="bg-pink-500 rounded-full py-4 items-center mt-4"
    style={{
      shadowColor: "#F03E84",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 14,
      elevation: 6,
    }}
  >
    <Text className="text-white text-base font-semibold tracking-wide">
      {label}
    </Text>
  </TouchableOpacity>
);










// ─── Root Navigator ───────────────────────────────────────────────────────────

const OnboardingFlow: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("ParentType");

  const next = (to: Screen) => setScreen(to);
  const back = (to: Screen) => setScreen(to);

  switch (screen) {
    case "ParentType":
      return (
        <ParentTypeScreen onContinue={() => next("ChildInfo")} />
      );
    case "ChildInfo":
      return (
        <ChildInfoScreen
          onContinue={() => next("Interests")}
          onBack={() => back("ParentType")}
        />
      );
    case "Interests":
      return (
        <InterestsScreen
          onContinue={() => next("ProfilePicture")}
          onBack={() => back("ChildInfo")}
        />
      );
    case "ProfilePicture":
      return (
        <ProfilePictureScreen
          onAdd={() => {}}
          onSkip={() => {}}
          onBack={() => back("Interests")}
        />
      );
    default:
      return null;
  }
};

export default OnboardingFlow;

// ─── Usage ────────────────────────────────────────────────────────────────────
// In App.tsx:
//   import OnboardingFlow from './OnboardingScreens';
//   export default function App() { return <OnboardingFlow />; }
//
// tailwind.config.js:
//   content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
//   presets: [require("nativewind/preset")],
//
// babel.config.js:
//   plugins: ["nativewind/babel"],