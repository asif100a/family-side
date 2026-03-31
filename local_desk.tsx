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

interface NavHeaderProps {
  title: string;
  onBack: () => void;
}
const NavHeader: React.FC<NavHeaderProps> = ({ title, onBack }) => (
  <TouchableOpacity
    onPress={onBack}
    className="flex-row items-center gap-x-2 py-3 mb-1"
    activeOpacity={0.7}
  >
    <BackArrow />
    <Text className="text-gray-900 text-xl font-bold tracking-tight">
      {title}
    </Text>
  </TouchableOpacity>
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

interface OptionCardProps {
  icon: string;
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}
const OptionCard: React.FC<OptionCardProps> = ({
  icon,
  title,
  description,
  selected,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className={`flex-row items-center gap-x-3 px-4 py-3 rounded-2xl border mb-3 ${
      selected
        ? "border-pink-400 bg-pink-50"
        : "border-gray-100 bg-white"
    }`}
  >
    {/* Icon bubble */}
    <View
      className={`w-11 h-11 rounded-full items-center justify-center ${
        selected ? "bg-pink-100" : "bg-gray-100"
      }`}
    >
      <Text className="text-xl">{icon}</Text>
    </View>

    {/* Text */}
    <View className="flex-1">
      <Text className="text-gray-900 text-sm font-semibold">{title}</Text>
      {description ? (
        <Text className="text-gray-400 text-xs leading-relaxed mt-0.5">
          {description}
        </Text>
      ) : null}
    </View>

    {selected && <CheckIcon />}
  </TouchableOpacity>
);

interface LocationInputProps {
  value: string;
  onChange: (val: string) => void;
}
const LocationInput: React.FC<LocationInputProps> = ({ value, onChange }) => (
  <View className="mb-4">
    <Text className="text-gray-500 text-xs font-medium mb-2">Location</Text>
    <View className="flex-row gap-x-2 items-center">
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Enter your location"
        placeholderTextColor="#B0B0C3"
        className="flex-1 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 text-sm bg-white"
      />
      <TouchableOpacity className="w-11 h-11 rounded-xl border border-gray-100 bg-pink-50 items-center justify-center">
        <PinIcon />
      </TouchableOpacity>
    </View>
  </View>
);

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
}
const InfoBox: React.FC<InfoBoxProps> = ({ title, children }) => (
  <View className="border border-gray-100 rounded-2xl p-4 mb-3">
    <Text className="text-gray-800 text-sm font-semibold mb-3">{title}</Text>
    {children}
  </View>
);

interface OutlineButtonProps {
  label: string;
  onPress: () => void;
}
const OutlineButton: React.FC<OutlineButtonProps> = ({ label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="flex-row items-center justify-center gap-x-2 border border-gray-100 rounded-full py-3 mt-2"
  >
    <PlusIcon />
    <Text className="text-gray-600 text-sm font-medium">{label}</Text>
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