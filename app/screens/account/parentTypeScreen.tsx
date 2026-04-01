import StandardButton from "@/components/buttons/StandardButton";
import NavHeader from "@/components/helper_components/account/NavHeader";
import OptionCard from "@/components/helper_components/account/OptionCard";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ParentTypeScreenProps {
  onContinue: () => void;
}

const ParentTypeScreen: React.FC<ParentTypeScreenProps> = () => {
  const [selected, setSelected] = useState<string>("Mother");

  const options = [
    {
      key: "Mother",
      icon: "M",
      title: "Mother",
      description: "Managing daily care, routines, and decisions for your child.",
    },
    {
      key: "Father",
      icon: "F",
      title: "Father",
      description: "Supporting your child's needs, plans, and family decisions.",
    },
    {
      key: "Other",
      icon: "CG",
      title: "Caregiver",
      description: "A guardian or family member actively involved in your child's care.",
    },
  ];

  const handleContinue = () => {
    // You can also pass the selected role to the next screen if needed
    // router.push("/screens/");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <NavHeader
          title="Who will be using FamilySide?"
          subtitle="Choose the role that best matches how you support your child. You can update this later."
          eyebrow="Step 1 of 4"
          showBackButton={false}
        />

        <View
          className="mb-6 mt-2 rounded-[32px] border border-rose-100 bg-white px-5 py-5"
          style={{
            shadowColor: "#F472B6",
            shadowOffset: { width: 0, height: 14 },
            shadowOpacity: 0.08,
            shadowRadius: 28,
            elevation: 2,
          }}
        >
          <Text className="text-xs font-semibold uppercase tracking-[1.8px] text-pink-500">
            Select one option
          </Text>
          <Text className="mt-3 text-sm leading-6 text-gray-600">
            This helps us personalize recommendations, resources, and language
            throughout your setup.
          </Text>
        </View>

        <View className="mb-4">
          {options.map((opt) => (
            <OptionCard
              key={opt.key}
              icon={opt.icon}
              title={opt.title}
              description={opt.description}
              selected={selected === opt.key}
              onPress={() => setSelected(opt.key)}
            />
          ))}
        </View>

        <View className="rounded-[28px] bg-white px-4 py-4">
          <Text className="mb-3 text-center text-sm leading-6 text-gray-500">
            You&apos;re almost set. We&apos;ll tailor the next steps based on
            your role.
          </Text>
          <StandardButton text="Continue" onPress={handleContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParentTypeScreen;
