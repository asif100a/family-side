import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Text from "@/lib/Text";
import { Colors } from "@/constants/theme";
import tw from "twrnc";

export default function SelectInputField({
  label = "Text",
  value,
  onSelectChange,
  placeholder = "Select a value",
  options,
  selectContainerStyle = {},
  inputContainerStyle = {},
  required = false,
  optional = false,
  readonly = false,
  errorMessage = "",
}: {
  label?: string;
  value: string;
  onSelectChange: (value: string) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
  selectContainerStyle?: object;
  inputContainerStyle?: object;
  required?: boolean;
  optional?: boolean;
  readonly?: boolean;
  errorMessage?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const styles = createStyles();

  // Find the selected label to display
  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

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
      <Pressable
        onPress={() => (readonly ? {} : setOpen(true))}
        style={[styles.inputPressable, selectContainerStyle]}
      >
        <View style={styles.inputField}>
          <Text
            style={[styles.inputText, !selectedLabel && styles.placeholderText]}
          >
            {selectedLabel || placeholder}
          </Text>
          {/* Dropdown arrow icon */}
          <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
        </View>
      </Pressable>
      {errorMessage && (
        <Text style={tw`text-red-500 text-xs mt-1`}>{errorMessage}</Text>
      )}

      {/* Dropdown Modal */}
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
        statusBarTranslucent
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.modalBox}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{label}</Text>
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Options List */}
              <ScrollView style={styles.optionsContainer}>
                {options.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.option,
                      item.value === value && styles.selectedOption,
                    ]}
                    onPress={() => {
                      onSelectChange(item.value);
                      setOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item.value === value && styles.selectedOptionText,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.value === value && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
      color: "#fff",
    },
    inputPressable: {
      width: "100%",
    },
    inputField: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      backgroundColor: "transparent",
      borderColor: Colors.commonColor.border,
      borderRadius: 6,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    inputText: {
      fontSize: 16,
      color: "#fff",
      flex: 1,
    },
    placeholderText: {
      color: "#CCCCCC",
    },
    arrow: {
      fontSize: 12,
      color: "#FFFFFFCC",
      marginLeft: 8,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      maxHeight: "70%",
    },
    modalBox: {
      width: "100%",
      backgroundColor: "#1a1a1a",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 50,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#333",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#fff",
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#333",
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "500",
    },
    optionsContainer: {
      maxHeight: 400,
    },
    option: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#2a2a2a",
    },
    selectedOption: {
      backgroundColor: "#2a2a2a",
    },
    optionText: {
      fontSize: 16,
      color: "#fff",
      flex: 1,
    },
    selectedOptionText: {
      fontWeight: "600",
      color: "#4a9eff",
    },
    checkmark: {
      fontSize: 18,
      color: "#4a9eff",
      fontWeight: "bold",
      marginLeft: 8,
    },
  });
}
