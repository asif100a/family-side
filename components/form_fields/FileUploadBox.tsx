import { View, TouchableOpacity, Alert } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Text from "@/lib/Text";
import tw from "twrnc";
import { Colors } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";

// ─── Types ────────────────────────────────────────────────────────────────────
export type UploadedFile = {
  uri: string;
  name: string;
  type: string;
  size?: number;
};

export type FileUploadMode = "image" | "pdf" | "both";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isImage = (type: string) => type.startsWith("image/");

// ─── Component ────────────────────────────────────────────────────────────────
export default function FileUploadBox({
  file,
  setFile,
  label,
  mode = "image",
  title,
  description,
  maxFileSize = 10,
  readonly = false,
  errorMessage = "",
}: {
  file: UploadedFile | null;
  setFile: Dispatch<SetStateAction<UploadedFile | null>>;
  label?: string;
  mode?: FileUploadMode;
  title?: string;
  description?: string;
  maxFileSize?: number;
  readonly?: boolean;
  errorMessage?: string;
}) {
  const MAX_FILE_SIZE_BYTES = maxFileSize * 1024 * 1024;

  // ── Derived defaults based on mode ──────────────────────────────────────────
  const defaultTitle =
    mode === "pdf"
      ? "Upload PDF"
      : mode === "both"
        ? "Upload Image or PDF"
        : "Upload Image";

  const defaultDescription =
    mode === "pdf"
      ? `PDF (max ${maxFileSize}MB)`
      : mode === "both"
        ? `PNG, JPG or PDF (max ${maxFileSize}MB)`
        : `PNG or JPG (max ${maxFileSize}MB)`;

  const resolvedTitle = title ?? defaultTitle;
  const resolvedDescription = description ?? defaultDescription;

  // ── Image picker ─────────────────────────────────────────────────────────────
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library.",
        [{ text: "OK" }],
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE_BYTES) {
      Alert.alert(
        "File Too Large",
        `Please select a file under ${maxFileSize}MB.`,
        [{ text: "OK" }],
      );
      return;
    }

    const uriParts = asset.uri.split(".");
    const extension = uriParts[uriParts.length - 1].toLowerCase();
    const mimeType = extension === "png" ? "image/png" : "image/jpeg";
    const fileName = asset.fileName ?? `upload_${Date.now()}.${extension}`;

    setFile({
      uri: asset.uri,
      name: fileName,
      type: mimeType,
      size: asset.fileSize,
    });
  };

  // ── PDF / Document picker ────────────────────────────────────────────────────
  const handlePickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    if (asset.size && asset.size > MAX_FILE_SIZE_BYTES) {
      Alert.alert(
        "File Too Large",
        `Please select a file under ${maxFileSize}MB.`,
        [{ text: "OK" }],
      );
      return;
    }

    setFile({
      uri: asset.uri,
      name: asset.name,
      type: "application/pdf",
      size: asset.size ?? undefined,
    });
  };

  // ── Upload handler — branches by mode ────────────────────────────────────────
  const handleUpload = async () => {
    if (mode === "image") {
      await handlePickImage();
    } else if (mode === "pdf") {
      await handlePickPdf();
    } else {
      // "both" — let user choose via action sheet
      Alert.alert("Upload File", "Choose a source", [
        { text: "Photo Library", onPress: handlePickImage },
        { text: "PDF Document", onPress: handlePickPdf },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  const handleRemoveFile = () => {
    if (readonly) return;
    setFile(null);
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <View style={tw`mb-0`}>
      {label && <Text style={tw`text-white text-sm mb-2`}>{label}</Text>}

      {file ? (
        // ── Preview state ──────────────────────────────────────────────────────
        <View
          style={tw`border-2 border-white/30 rounded-lg overflow-hidden bg-[${Colors.commonColor.glass}]`}
        >
          {isImage(file.type) ? (
            // ── Image thumbnail with ✕ overlay ─────────────────────────────
            <View style={tw`relative`}>
              <Image
                source={{ uri: file.uri }}
                style={tw`w-full h-48`}
                contentFit="cover"
              />
              <TouchableOpacity
                onPress={handleRemoveFile}
                style={tw`absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 items-center justify-center`}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={tw`text-white text-sm leading-none`}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // ── PDF icon card — no thumbnail available for PDFs ────────────
            <View
              style={tw`relative h-28 items-center justify-center bg-red-500/10`}
            >
              <Ionicons
                name="document-text-outline"
                size={40}
                color="#ef4444"
              />
              <Text style={tw`text-red-400 text-xs mt-1 font-medium`}>PDF</Text>
              <TouchableOpacity
                onPress={handleRemoveFile}
                style={tw`absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 items-center justify-center`}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={tw`text-white text-sm leading-none`}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* File info + replace button */}
          <View style={tw`flex-row items-center justify-between px-4 py-3`}>
            <View style={tw`flex-1 mr-3`}>
              <Text
                style={tw`text-white text-xs font-medium`}
                numberOfLines={1}
              >
                {file.name}
              </Text>
              {file.size && (
                <Text style={tw`text-white/50 text-xs mt-0.5`}>
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </Text>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => (readonly ? {} : handleUpload())}
              style={tw`px-3 py-1.5 rounded-md border border-white/30`}
            >
              <Text style={tw`text-white text-xs`}>Replace</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // ── Empty / Upload state ───────────────────────────────────────────
        <>
          <TouchableOpacity
            onPress={() => (readonly ? {} : handleUpload())}
            style={tw`border-2 border-dashed border-white/50 rounded-lg py-8 items-center bg-[${Colors.commonColor.glass}]`}
            activeOpacity={0.7}
          >
            <Text style={tw`text-3xl mb-2.5`}>
              {mode === "pdf" ? "📄" : mode === "both" ? "📎" : "📤"}
            </Text>
            <Text style={tw`text-white text-lg font-medium mb-1.5`}>
              {resolvedTitle}
            </Text>
            <Text style={tw`text-white/80 text-xs text-center`}>
              {resolvedDescription}
            </Text>
          </TouchableOpacity>
          {errorMessage && (
            <Text style={tw`text-red-500 text-xs mt-1`}>{errorMessage}</Text>
          )}
        </>
      )}
    </View>
  );
}
