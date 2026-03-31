import { Box } from "@/components/ui/box";
import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import FamilysideLogo from "@/assets/images/app-icon.png";
import BG_IMG from "@/assets/images/onboarding/bg-img.png";
import { ImageBackground } from "@/components/ui/image-background";

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({
  onFinish = () => {},
}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <ImageBackground source={BG_IMG} style={{ flex: 1 }} resizeMode="cover">
      <Box style={styles.container}>
        {/* Subtle wavy background lines */}
        <Box style={styles.waveBg} />

        <Box style={styles.content}>
          <Image
            source={FamilysideLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </Box>
      </Box>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  waveBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // decorative subtle radial hint
    backgroundColor: "transparent",
  },
  content: {
    alignItems: "center",
    gap: 16,
  },
  logo: {
    width: 148,
    height: 122,
  },
  brandName: {
    fontSize: 28,
    fontWeight: "600",
    color: "#222222",
    letterSpacing: 0.5,
    marginTop: 8,
  },
});
