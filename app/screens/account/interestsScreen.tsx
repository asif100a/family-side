// ─── Screen 4: Interests ─────────────────────────────────────────────────────

interface InterestsScreenProps {
  onContinue: () => void;
  onBack: () => void;
}
const InterestsScreen: React.FC<InterestsScreenProps> = ({
  onContinue,
  onBack,
}) => {
  const allInterests = [
    "Education",
    "Music",
    "Outdoor Play",
    "Sports",
    "Art & Craft",
    "Dance",
    "Coding",
    "Reading",
    "Others",
  ];
  const [selected, setSelected] = useState<string[]>(["Education"]);

  const toggle = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <FakeStatusBar />
        <NavHeader title="Interests" onBack={onBack} />

        <Text className="text-gray-700 text-sm font-medium mb-4">
          What activities does your child enjoy?
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {allInterests.map((tag) => {
            const isActive = selected.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                onPress={() => toggle(tag)}
                activeOpacity={0.75}
                className={`px-4 py-2 rounded-full border ${
                  isActive
                    ? "bg-pink-500 border-pink-500"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    isActive ? "text-white" : "text-gray-700"
                  }`}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="mt-8">
          <PrimaryButton label="Continue" onPress={onContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};