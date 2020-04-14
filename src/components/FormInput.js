import React from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Label, Input, Select } from "@rebass/forms";

function FormInput({ label, name, value, type, onChange, isDisabled }) {
  return (
    <Flex my="5px" alignItems="center">
      <Label htmlFor={name}>{label}</Label>
      <Input
        sx={{ maxWidth: "50px" }}
        disabled={isDisabled}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </Flex>
  );
}

export default FormInput;
