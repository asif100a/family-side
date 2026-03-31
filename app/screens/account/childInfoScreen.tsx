// ─── Screen 2 & 3: Tell Us About Your Child ───────────────────────────────────

interface ChildInfoScreenProps {
  onContinue: () => void;
  onBack: () => void;
}
const ChildInfoScreen: React.FC<ChildInfoScreenProps> = ({
  onContinue,
  onBack,
}) => {
  const [location, setLocation] = useState("");
  const [childType, setChildType] = useState<string[]>([]);

  const toggleChildType = (type: string) => {
    setChildType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const isExpecting = childType.includes("Expecting");
  const isKids = childType.includes("Kids");

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <FakeStatusBar />
        <NavHeader title="Tell us about your Child" onBack={onBack} />

        <LocationInput value={location} onChange={setLocation} />

        {/* Child type selector */}
        <OptionCard
          icon="🤰"
          title="Expecting"
          selected={isExpecting}
          onPress={() => toggleChildType("Expecting")}
        />
        <OptionCard
          icon="👶"
          title="Kids"
          selected={isKids}
          onPress={() => toggleChildType("Kids")}
        />

        {/* Expecting Info */}
        {isExpecting && (
          <InfoBox title="Expecting Information">
            <Text className="text-gray-500 text-xs font-medium mb-1">
              Expected Due Date
            </Text>
            <View className="flex-row items-center border border-gray-100 rounded-xl px-4 py-3 bg-white">
              <TextInput
                placeholder="DD/MM"
                placeholderTextColor="#B0B0C3"
                className="flex-1 text-gray-800 text-sm"
              />
              <CalendarIcon />
            </View>
            <OutlineButton label="Add more kids" onPress={() => {}} />
          </InfoBox>
        )}

        {/* Kids Info */}
        {isKids && (
          <InfoBox title="Kids Information">
            <Text className="text-gray-500 text-xs font-medium mb-1">
              Child name
            </Text>
            <TextInput
              placeholder="Enter child's name"
              placeholderTextColor="#B0B0C3"
              className="border border-gray-100 rounded-xl px-4 py-3 text-gray-800 text-sm bg-white mb-3"
            />

            <View className="flex-row gap-x-3">
              <View className="flex-1">
                <Text className="text-gray-500 text-xs font-medium mb-1">
                  Gender
                </Text>
                <TextInput
                  placeholder="Select"
                  placeholderTextColor="#B0B0C3"
                  className="border border-gray-100 rounded-xl px-4 py-3 text-gray-800 text-sm bg-white"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs font-medium mb-1">
                  Date of Birth
                </Text>
                <View className="flex-row items-center border border-gray-100 rounded-xl px-3 py-3 bg-white">
                  <TextInput
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="#B0B0C3"
                    className="flex-1 text-gray-800 text-xs"
                  />
                  <CalendarIcon />
                </View>
              </View>
            </View>
            <OutlineButton label="Add more kids" onPress={() => {}} />
          </InfoBox>
        )}

        <PrimaryButton label="Continue" onPress={onContinue} />
      </ScrollView>
    </SafeAreaView>
  );
};