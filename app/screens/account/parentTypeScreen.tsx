// ─── Screen 1: Parent Type ────────────────────────────────────────────────────

interface ParentTypeScreenProps {
  onContinue: () => void;
}
const ParentTypeScreen: React.FC<ParentTypeScreenProps> = ({ onContinue }) => {
  const [selected, setSelected] = useState<string>("Mother");

  const options = [
    {
      key: "Mother",
      icon: "👩",
      title: "Mother",
      description:
        "A parent who is responsible for managing and finding services, activities, and support for their child.",
    },
    {
      key: "Father",
      icon: "👨",
      title: "Father",
      description:
        "A parent or legal guardian who cares for the child and makes important decisions regarding their well-being.",
    },
    {
      key: "Other",
      icon: "👴",
      title: "Other",
      description:
        "A caregiver (such as a grandparent, aunt, uncle, or guardian) who supports and participates in the child's care and activities.",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <FakeStatusBar />
        <NavHeader title="Parent Type" onBack={() => {}} />

        <Text className="text-gray-500 text-sm font-medium mb-4">
          Who are you?
        </Text>

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

        <View className="mt-4">
          <PrimaryButton label="Continue" onPress={onContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};