import { Modal, Pressable, StyleSheet, View } from "react-native";
import React from "react";

export default function ModalContainer({
  visible,
  setVisible,
  children,
  className = "",
  overlayStyle = {}
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: React.ReactNode;
  className?: string;
  overlayStyle?: object
}) {
  const styles = createStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
      statusBarTranslucent
    >
      <Pressable style={[styles.overlay, overlayStyle]} onPress={() => setVisible(false)}>
        <View className={`w-full p-4 z-10 ${className}`} onStartShouldSetResponder={() => true}>
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}

function createStyles() {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "center",
      alignItems: "center",
    },
  });
}
