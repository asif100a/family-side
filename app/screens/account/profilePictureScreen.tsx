// ─── Screen 5: Profile Picture ───────────────────────────────────────────────

import StandardButton from "@/components/buttons/StandardButton";
import NavHeader from "@/components/helper_components/account/NavHeader";
import { Text } from "@/components/Themed";
import { EditIcon } from "@/components/ui/icon";
import { View } from "@/components/ui/view";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfilePictureScreenProps {
  onAdd: () => void;
  onSkip: () => void;
  onBack: () => void;
}
const ProfilePictureScreen: React.FC<ProfilePictureScreenProps> = ({
  onAdd,
  onSkip,
  onBack,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5">
        <NavHeader title="Profile picture" onBack={onBack} />

        <Text className="text-gray-400 text-sm mb-8">
          Everyone will be able to see your picture..
        </Text>

        {/* Avatar */}
        <View className="flex-1 items-center justify-center">
          <View className="relative">
            <View
              className="w-36 h-36 rounded-full bg-gray-100 items-center justify-center"
              style={{
                borderWidth: 3,
                borderColor: "#FBC4DC",
              }}
            >
              {/* Placeholder person silhouette */}
              <Text className="text-7xl text-gray-300">👤</Text>
            </View>

            {/* Edit button */}
            <TouchableOpacity
              className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white border border-gray-200 items-center justify-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 3,
              }}
            >
              <EditIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}
        <View className="pb-6">
          <StandardButton text="Add Picture" onPress={onAdd} />
          <TouchableOpacity onPress={onSkip} className="mt-4 items-center">
            <Text className="text-pink-500 text-sm font-semibold">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
