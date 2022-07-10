import React from "react";
import { FC, InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

/**
 * UI Default input
 */

type IInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  name: string;
  isRequired?: boolean;
};

export const InputField: FC<IInputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  //@ts-ignore
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {/*@ts-ignore*/}
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
