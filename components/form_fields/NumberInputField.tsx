import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import Text from "@/lib/Text";
import tw from "twrnc";
import { Colors } from "@/constants/theme";

export default function NumberInputField({
  label = "Number",
  value,
  onNumberChange,
  placeholder = "Enter Your Number",
  required,
  readonly = false,
  errorMessage = "",
  optional = false,
}: {
  label?: string;
  value: number | undefined;
  onNumberChange: (value: number | undefined) => void;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  optional?: boolean;
  errorMessage?: string;
}) {
  const styles = createStyles();

  const handleChange = (value: string) => {
    if (value === "") {
      onNumberChange(undefined);
    } else {
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        onNumberChange(numericValue);
      }
    }
  };

  return (
    <View style={styles.inputContainer}>
      {label && (
        <View style={tw`flex-row items-center`}>
          <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>
          {optional && (
            <Text style={tw`text-white/80 text-sm ml-1`}>(Optional)</Text>
          )}
          {required && <Text style={{ color: "white" }}> *</Text>}
        </View>
      )}
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        value={value !== undefined ? value.toString() : ""}
        onChangeText={handleChange}
        keyboardType="number-pad"
        placeholderTextColor={"#FFFFFF8C"}
        readOnly={readonly}
      />
      {errorMessage && (
        <Text style={tw`text-red-500 text-xs mt-1`}>{errorMessage}</Text>
      )}
    </View>
  );
}

function createStyles() {
  return StyleSheet.create({
    primaryFontSize: {
      fontSize: 16,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontWeight: "500",
      marginBottom: 6,
      color: "white",
    },
    inputField: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderColor: Colors.commonColor.border,
      borderRadius: 6,
      paddingHorizontal: 16,
      color: "white",
    },
  });
}
