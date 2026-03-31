import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";

export default function StandardCheckbox({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (e: any, value: boolean) => void;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center gap-2"
      onPress={(e) => onValueChange(e, !value)}
      activeOpacity={0.7}
    >
      <View
        className={`w-4 h-4 rounded border ${
          value ? "bg-[#F0436F] border-[#F0436F]" : "bg-white border-[#ccc]"
        } items-center justify-center`}
      >
        {value ? (
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
    </TouchableOpacity>
  );
}
