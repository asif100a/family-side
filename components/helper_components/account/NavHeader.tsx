import { Text, View } from "@/components/Themed";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { TouchableOpacity } from "react-native";

interface NavHeaderProps {
  title: string;
  onBack?: () => void;
  subtitle?: string;
  eyebrow?: string;
  showBackButton?: boolean;
}

const NavHeader: React.FC<NavHeaderProps> = ({
  title,
  onBack,
  subtitle,
  eyebrow,
  showBackButton = true,
}) => (
  <View className="pb-3 pt-2">
    {eyebrow ? (
      <Text className="mb-3 text-xs font-semibold uppercase tracking-[1.8px] text-pink-500">
        {eyebrow}
      </Text>
    ) : null}

    <View className="flex-row items-start gap-x-3">
      {showBackButton ? (
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.75}
          className="mt-1 h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-white"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </TouchableOpacity>
      ) : null}

      <View className="flex-1">
        <Text className="text-[28px] font-bold leading-8 text-gray-950">
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-2 text-sm leading-6 text-gray-500">
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  </View>
);

export default NavHeader;
