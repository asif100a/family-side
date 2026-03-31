import { Colors } from "@/constants/theme";
import { Checkbox } from "expo-checkbox";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function CheckboxField({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {

  const styles = createStyles();

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
        color={value ? Colors.commonColor.green : "#FFFFFF40"}
      />
    </View>
  );
}

function createStyles() {
  return StyleSheet.create({
    checkboxContainer: {
      flexDirection: "row",
      gap: 8,
      alignItems: 'center'
    },
  });
}
