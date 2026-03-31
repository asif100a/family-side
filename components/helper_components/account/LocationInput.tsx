import { Text, View } from "@/components/Themed";
import { TextInput, TouchableOpacity } from "react-native";

interface LocationInputProps {
  value: string;
  onChange: (val: string) => void;
}

const PinIcon = () => <Text className="text-pink-500 text-lg">📍</Text>;

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

export default LocationInput;