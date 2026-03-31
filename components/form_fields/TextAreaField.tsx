import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import Text from "@/lib/Text";
import tw from "twrnc";
import { Colors } from "@/constants/theme";

export default function TextAreaField({
  label = "Text",
  value,
  onTextChange,
  placeholder = "Enter Your Text",
  numberOfLines = 5,
  optional,
  required = false,
  inputContainerStyle = {},
  inputFieldStyle = {},
  readonly = false,
  errorMessage = "",
}: {
  label?: string;
  value: string;
  onTextChange: (value: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  optional?: boolean;
  required?: boolean;
  inputContainerStyle?: object;
  inputFieldStyle?: object;
  readonly?: boolean;
  errorMessage?: string;
}) {
  const styles = createStyles();

  return (
    <View style={[styles.inputContainer, inputContainerStyle]}>
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
        numberOfLines={numberOfLines}
        multiline
        style={[styles.inputField, inputFieldStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onTextChange}
        keyboardType="default"
        textAlignVertical="top"
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
      height: 120,
      borderWidth: 1,
      borderColor: Colors.commonColor.border,
      borderRadius: 6,
      paddingHorizontal: 16,
      paddingVertical: 16,
      color: "white",
    },
  });
}
