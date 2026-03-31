import { View, TextInput, StyleSheet, Platform, Pressable } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Text from "@/lib/Text";
import tw from 'twrnc'

export default function TimeInputField({
  label = "Text",
  time,
  onTimeChange,
  placeholder = "Enter Your Text",
  errorMessage = "",
}: {
  label?: string;
  time: Date | null;
  onTimeChange: Dispatch<SetStateAction<Date | null>>;
  placeholder?: string;
  errorMessage?: string;
}) {
  const [show, setShow] = useState<boolean>(false);

  const styles = createStyles();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>
      <Pressable onPress={() => setShow(true)}>
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          value={time?.toLocaleTimeString()}
          keyboardType="default"
          editable={false}
          pointerEvents="none"
          placeholderTextColor={"#FFFFFF8C"}
        />
      </Pressable>
      {errorMessage && (
        <Text style={tw`text-red-500 text-xs mt-1`}>{errorMessage}</Text>
      )}

      {show && time && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedTime) => {
            setShow(Platform.OS === "ios");
            if (selectedTime) onTimeChange(selectedTime);
          }}
        />
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
    },
    inputField: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      backgroundColor: "transparent",
      borderColor: "white",
      borderRadius: 50,
      paddingHorizontal: 16,
    },
  });
}
