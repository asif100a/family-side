import { View, TextInput, StyleSheet, Platform, Pressable } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Text from "@/lib/Text";
import tw from "twrnc";
import { Colors } from "@/constants/theme";

export default function DateInputField({
  label = "Text",
  date,
  onDateChange,
  placeholder = "Enter Your Date",
  required = false,
  readonly = false,
  errorMessage = "",
}: {
  label?: string;
  date: Date | null;
  onDateChange: (value: Date) => void;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  errorMessage?: string;
}) {
  const [show, setShow] = useState<boolean>(false);

  const styles = createStyles();

  // Function to format the date for displaying
  const formatDate = (rawDate: Date | null) => {
    if (!rawDate || !(rawDate instanceof Date) || isNaN(rawDate.getTime())) {
      return "";
    }
    return rawDate.toLocaleDateString("en-US");
  };

  // Use today's date as fallback when picker opens and no date is set yet
  const pickerValue =
    date && date instanceof Date && !isNaN(date.getTime()) ? date : new Date();

  // OnChange function
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;

    // On Android, close the picker immediately after selecting a date
    if (Platform.OS === "android") {
      setShow(false);
    }

    // For iOS, you might keep the picker visible for live selection,
    // but typically you close it or rely on a 'Done' button.
    if (currentDate) onDateChange(currentDate);
  };

  const showPicker = () => setShow(true);

  return (
    <View style={styles.inputContainer}>
      {label && (
        <View style={tw`flex-row`}>
          <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>
          {required && <Text style={{ color: "white" }}> *</Text>}
        </View>
      )}

      <Pressable onPress={() => (readonly ? {} : showPicker())}>
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          value={formatDate(date)}
          editable={false} // Prevent manual text input
          placeholderTextColor={"#FFFFFF8C"}
        />
      </Pressable>
      {errorMessage && (
        <Text style={tw`text-red-500 text-xs mt-1`}>{errorMessage}</Text>
      )}

      {/* Conditionally render the DateTimePicker */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={pickerValue}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"} // Use spinner for better iOS look
          onChange={onChange}
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
      color: "white",
    },
    inputField: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderColor: Colors.commonColor.border,
      backgroundColor: "transparent",
      borderRadius: 6,
      paddingHorizontal: 16,
      color: "white",
    },
  });
}
