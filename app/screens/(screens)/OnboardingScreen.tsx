import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { Text } from "@/components/Themed";
import FamilysideLogo from "@/assets/images/logo.png";
import ONBOARDING_IMG_1 from "@/assets/images/onboarding/onboard_img_1.png";
import ONBOARDING_IMG_2 from "@/assets/images/onboarding/onboard_img_2.png";
import ONBOARDING_IMG_3 from "@/assets/images/onboarding/onboard_img_3.png";
import { ImageBackground } from "@/components/ui/image-background";
import BG_IMG from "@/assets/images/onboarding/bg-img.png";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  Illustration: ImageSourcePropType;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: "activities",
    title: "Find Activities for\nYour Kids",
    subtitle:
      "Discover doctors, playgrounds, nurseries and family services near you.",
    Illustration: ONBOARDING_IMG_1,
  },
  {
    id: "suggestions",
    title: "Personalized\nSuggestions",
    subtitle: "Get recommendations based on your child's age.",
    Illustration: ONBOARDING_IMG_2,
  },
  {
    id: "community",
    title: "Trusted Parent\nCommunity",
    subtitle: "Read reviews from parents and share your experience.",
    Illustration: ONBOARDING_IMG_3,
  },
];

interface OnboardingScreenProps {
  onComplete?: () => void;
}

export default function OnboardingScreen({
  onComplete = () => {},
}: OnboardingScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  const handleContinue = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const LOGO_WIDTH = 196;
  const LOGO_HEIGHT = 42;

  const renderSlide = ({ item }: { item: OnboardingSlide }) => {
    const { Illustration, title, subtitle } = item;
    return (
      <ImageBackground source={BG_IMG} style={{ flex: 1 }} resizeMode="cover">
        <View style={{ width: SCREEN_WIDTH }} className="flex-1 bg-transparent">
          {/* Header */}
          <View className="flex-row justify-center items-center gap-2 px-6 pt-14 pb-2">
            <Image
              source={FamilysideLogo}
              className={`w-[${LOGO_WIDTH}px] h-[${LOGO_HEIGHT}px]`}
              resizeMode="contain"
            />
          </View>

          {/* Illustration area */}
          <View className="flex-1 items-center justify-end">
            <Image
              source={Illustration}
              style={{
                width: SCREEN_WIDTH * 0.85,
                height: SCREEN_WIDTH * 0.85,
              }}
              resizeMode="contain"
            />
          </View>

          {/* Bottom card */}
          <View className="bg-[#EF477F] rounded-t-[28px] px-7 pt-8 pb-12 min-h-[220px] justify-end items-center">
            {/* Pagination dots */}
            <View className="flex-row gap-1.5 mb-[18px]">
              {SLIDES.map((_, i) => (
                <View
                  key={i}
                  className={`h-1.5 rounded-full ${
                    i === activeIndex
                      ? "w-[22px] bg-white/95"
                      : "w-2 bg-white/45"
                  }`}
                />
              ))}
            </View>

            <Text className="text-[32px] text-center font-bold text-white leading-[34px] mb-3">
              {title}
            </Text>
            <Text className="text-[15px] text-center text-white/85 leading-5 mb-7 max-w-[336px]">
              {subtitle}
            </Text>

            {/* Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 h-[52px] rounded-[14px] border border-white/60 items-center justify-center bg-transparent"
                onPress={handleSkip}
                activeOpacity={0.7}
              >
                <Text className="text-white text-base font-semibold">Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 h-[52px] rounded-[14px] bg-white items-center justify-center shadow-sm"
                onPress={handleContinue}
                activeOpacity={0.85}
              >
                <Text
                  className="text-base font-bold"
                  style={{ color: "#000000" }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };

  return (
    <View className="flex-1 bg-[#fafafa]">
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        scrollEventThrottle={16}
      />
    </View>
  );
}
