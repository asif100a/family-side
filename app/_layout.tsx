import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/components/useColorScheme";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SplashScreenComponent from "./screens/(screens)/SplashScreen";
import OnboardingScreen from "./screens/(screens)/OnboardingScreen";
import ChooseRoleScreen from "./screens/(screens)/ChooseRoleScreen";
import LoginScreen from "./screens/auth/login";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

type AppState = "splash" | "onboarding" | "chooseRole" | "home";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<"system" | "light" | "dark">("system");

  const [appState, setAppState] = useState<AppState>("splash");

  // Determine effective color scheme
  const effectiveColorScheme =
    mode === "system" ? (systemColorScheme ?? "light") : mode;

  const handleToggleTheme = () => {
    if (mode === "system") {
      setMode("light");
    } else if (mode === "light") {
      setMode("dark");
    } else {
      setMode("system");
    }
  };

  const renderScreen = () => {
    switch (appState) {
      case "splash":
        return (
          <SafeAreaView style={styles.safeArea}>
            <SplashScreenComponent onFinish={() => setAppState("onboarding")} />
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

  return (
    <GluestackUIProvider mode={mode}>
      <ThemeProvider
        value={effectiveColorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <SafeAreaProvider>
          <StatusBar style="dark" />
          {renderScreen()}
        </SafeAreaProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
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
