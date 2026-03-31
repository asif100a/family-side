import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "./screens/(screens)/SplashScreen";
import OnboardingScreen from "./screens/(screens)/OnboardingScreen";
import ChooseRoleScreen from "./screens/(screens)/ChooseRoleScreen";
import LoginScreen from "./screens/auth/login";

type AppState = "splash" | "onboarding" | "chooseRole" | "home";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("splash");

  const renderScreen = () => {
    switch (appState) {
      case "splash":
        return (
          <SafeAreaView style={styles.safeArea}>
            <SplashScreen onFinish={() => setAppState("onboarding")} />
          </SafeAreaView>
        );
      case "onboarding":
        return (
          <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <OnboardingScreen onComplete={() => setAppState("chooseRole")} />;
          </SafeAreaView>
        );
      case "chooseRole":
        return (
          <SafeAreaView style={styles.safeArea}>
            <ChooseRoleScreen
              onRoleSelected={(role) => {
                console.log("Selected role:", role);
                setAppState("home");
              }}
            />
          </SafeAreaView>
        );
      case "home":
        // Placeholder – plug your main navigator here
        return <LoginScreen />;
      default:
        return null;
    }
  };

  return renderScreen();
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  placeholder: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
});
