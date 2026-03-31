import { Text, View } from "@/components/Themed";
import { CheckIcon } from "@/components/ui/icon";
import { TouchableOpacity } from "react-native";

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
    activeOpacity={0.9}
    className={`mb-4 flex-row items-start gap-x-4 rounded-[28px] border px-4 py-4 ${
      selected ? "border-pink-500 bg-rose-50" : "border-rose-100 bg-white"
    }`}
    style={
      selected
        ? {
            shadowColor: "#EF477F",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.12,
            shadowRadius: 24,
            elevation: 3,
          }
        : undefined
    }
  >
    <View
      className={`h-14 w-14 items-center justify-center rounded-2xl ${
        selected ? "bg-pink-500" : "bg-rose-50"
      }`}
    >
      <Text
        className={`text-lg font-semibold ${
          selected ? "text-white" : "text-pink-500"
        }`}
      >
        {icon}
      </Text>
    </View>

    <View className="flex-1 pr-2">
      <Text className="text-base font-semibold text-gray-950">{title}</Text>
      {description ? (
        <Text className="mt-1.5 text-sm leading-6 text-gray-500">
          {description}
        </Text>
      ) : null}
    </View>

    <View
      className={`mt-1 h-7 w-7 items-center justify-center rounded-full border ${
        selected ? "border-pink-500 bg-pink-500" : "border-rose-200 bg-white"
      }`}
    >
      {selected ? <CheckIcon className="h-4 w-4 text-white" /> : null}
    </View>
  </TouchableOpacity>
);

export default OptionCard;
