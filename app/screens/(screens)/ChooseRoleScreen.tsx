import { Text } from "@/components/Themed";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { ImageBackground } from "@/components/ui/image-background";
import BG_IMG from "@/assets/images/onboarding/bg-img.png";

const BRAND = "#F0436F";

// Family icon SVG
function FamilyIcon({ selected }: { selected: boolean }) {
  const color = selected ? BRAND : "#888";
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      {/* Adult */}
      <Circle cx="24" cy="12" r="6" stroke={color} strokeWidth="2" />
      <Path
        d="M14 32C14 26 18.477 22 24 22C29.523 22 34 26 34 32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Child left */}
      <Circle cx="10" cy="22" r="4.5" stroke={color} strokeWidth="1.8" />
      <Path
        d="M4 36C4 32 6.686 29 10 29C13.314 29 16 32 16 36"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Child right */}
      <Circle cx="38" cy="22" r="4.5" stroke={color} strokeWidth="1.8" />
      <Path
        d="M32 36C32 32 34.686 29 38 29C41.314 29 44 32 44 36"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Service provider icon SVG
function ProviderIcon({ selected }: { selected: boolean }) {
  const color = selected ? BRAND : "#888";
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      {/* Person */}
      <Circle cx="24" cy="14" r="7" stroke={color} strokeWidth="2" />
      {/* Briefcase */}
      <Rect
        x="12"
        y="30"
        width="24"
        height="16"
        rx="3"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M18 30V27C18 25.343 19.343 24 21 24H27C28.657 24 30 25.343 30 27V30"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M12 38H36"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Body */}
      <Path
        d="M16 30C16 24.477 19.582 22 24 22C28.418 22 32 24.477 32 30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

interface ChooseRoleScreenProps {
  onRoleSelected?: (role: "family" | "provider") => void;
}

export default function ChooseRoleScreen({
  onRoleSelected = () => {},
}: ChooseRoleScreenProps) {
  const [selected, setSelected] = useState<"family" | "provider">("family");

  return (
    <ImageBackground source={BG_IMG} className="flex-1" resizeMode="cover">
      {/* container */}
      <View className="flex-1 justify-center bg-transparent">
        {/* content */}
        <View className="px-7 pt-10">
          <Text
            className="text-[28px] font-bold mb-8"
            style={{ color: "#1a1a1a" }}
          >
            Choose Your Role
          </Text>

          {/* cards row */}
          <View className="flex-row gap-3.5 mb-8">
            {/* Family/Parent card */}
            <TouchableOpacity
              className={`flex-1 aspect-square rounded-[18px] items-center justify-center gap-3 p-4 border-[2.5px] ${
                selected === "family"
                  ? "bg-[#fce7ef] border-[#F0436F]"
                  : "bg-[#f0f0f0] border-transparent"
              }`}
              onPress={() => setSelected("family")}
              activeOpacity={0.8}
            >
              <FamilyIcon selected={selected === "family"} />
              <Text
                className={`text-sm font-semibold text-center`} style={{ color: selected === "family" ? BRAND : "#666" }}
              >
                Family/Parent
              </Text>
            </TouchableOpacity>

            {/* Service Provider card */}
            <TouchableOpacity
              className={`flex-1 aspect-square rounded-[18px] items-center justify-center gap-3 p-4 border-[2.5px] ${
                selected === "provider"
                  ? "bg-[#fce7ef] border-[#F0436F]"
                  : "bg-[#f0f0f0] border-transparent"
              }`}
              onPress={() => setSelected("provider")}
              activeOpacity={0.8}
            >
              <ProviderIcon selected={selected === "provider"} />
              <Text
                className={`text-sm font-semibold text-center`} style={{ color: selected === "provider" ? BRAND : "#666" }}
              >
                Service Provider
              </Text>
            </TouchableOpacity>
          </View>

          {/* Continue button */}
          <TouchableOpacity
            className="h-14 rounded-lg bg-[#F0436F] items-center justify-center shadow-lg"
            style={{
              shadowColor: BRAND,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6,
            }}
            onPress={() => onRoleSelected(selected)}
            activeOpacity={0.85}
          >
            <Text className="text-white text-[17px] font-bold tracking-wide">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
