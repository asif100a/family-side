import React from "react";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Input, InputField } from "../ui/input";

type StandardInputFieldProps<T extends FieldValues> = {
  label?: string;
  id: FieldPath<T>;
  type?: "text" | "email" | "password" | "phone";
  control: Control<T>;
  readOnly?: boolean;
  placeholder?: string;
  required?: boolean;
};

export default function StandardInputField<T extends FieldValues>({
  label = "",
  id,
  type = "text",
  control,
  readOnly = false,
  placeholder,
  required = true,
}: StandardInputFieldProps<T>) {
  const resolvedPlaceholder =
    placeholder ??
    (type === "email"
      ? "Enter your email"
      : type === "phone"
      ? "Enter your phone number"
      : `Enter your ${label.toLowerCase()}`);

  return (
    <Controller
      control={control}
      name={id}
      rules={{ required: required ? `${label} is required.` : undefined }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <FormControl isInvalid={Boolean(error)} className="mb-5">
          <FormControlLabel className="mb-2">
            <FormControlLabelText
              className="text-[#333] text-sm font-semibold"
              accessibilityLabel={label}
            >
              {label}
            </FormControlLabelText>
          </FormControlLabel>
          <Input
            variant="outline"
            size="xl"
            className="h-[52px] rounded-lg border border-[#e8e8e8] bg-white"
          >
            <InputField
              value={value == null ? "" : String(value)}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={resolvedPlaceholder}
              placeholderTextColor="#bbb"
              keyboardType={
                type === "email"
                  ? "email-address"
                  : type === "phone"
                  ? "phone-pad"
                  : "default"
              }
              textContentType={
                type === "email"
                  ? "emailAddress"
                  : type === "password"
                  ? "password"
                  : type === "phone"
                  ? "telephoneNumber"
                  : "none"
              }
              autoCapitalize={type === "text" ? "sentences" : "none"}
              secureTextEntry={type === "password"}
              readOnly={readOnly}
              className="text-sm text-[#222]"
            />
          </Input>
          {error?.message ? (
            <FormControlError>
              <FormControlErrorText className="text-xs text-[#d92d20]">
                {error.message}
              </FormControlErrorText>
            </FormControlError>
          ) : null}
        </FormControl>
      )}
    />
  );
}
