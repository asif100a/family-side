import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Text from "@/lib/Text";
import { Colors } from "@/constants/theme";

export default function ButtonOutline({
  title,
  onPress,
  style,
  disabled,
  loading,
   indicatorColor = Colors.commonColor.green || "#fff",
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
  disabled?: boolean;
  loading?: boolean;
  indicatorColor?: string;
}) {
  const styles = createStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.button}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="large" color={indicatorColor} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

function createStyles() {
  return StyleSheet.create({
    gradientBorder: {
      padding: 1,
      borderRadius: 25,
      borderColor: "transparent",
      marginTop: 16,
    },
    button: {
      backgroundColor: "#fff",
      borderRadius: 25,
      paddingVertical: 14,
      paddingHorizontal: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}
