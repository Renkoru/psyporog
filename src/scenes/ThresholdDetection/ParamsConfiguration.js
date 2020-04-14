import React from "react";

import { Button, Box, Text, Flex } from "rebass";
import { Label, Input, Select } from "@rebass/forms";

import FormInput from "../../components/FormInput";

function ParamsConfiguration({
  volumesNumber,
  testsPerVolume,
  onChange,
  isDisabled,
}) {
  function onParamsChange(event) {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);
    onChange(
      Object.assign(
        {
          volumesNumber,
          testsPerVolume,
        },
        {
          [name]: parseInt(value),
        }
      )
    );
  }

  return (
    <Flex>
      <Box width="220px">
        <FormInput
          label="Всего уровней"
          name="volumesNumber"
          value={volumesNumber}
          type="number"
          onChange={onParamsChange}
          isDisabled={isDisabled}
        />
        <FormInput
          label="Тестов на значение"
          name="testsPerVolume"
          value={testsPerVolume}
          type="number"
          onChange={onParamsChange}
          isDisabled={isDisabled}
        />
      </Box>
    </Flex>
  );
}

export default ParamsConfiguration;
