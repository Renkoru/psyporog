import React from "react";

import { Button, Box, Text, Flex } from "rebass";
import { Label, Input, Select } from "@rebass/forms";

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
    <Box width="220px">
      <Flex>
        <Label htmlFor="volumesNumber">Всего уровней</Label>
        <Input
          disabled={isDisabled}
          sx={{ maxWidth: "50px" }}
          name="volumesNumber"
          type="number"
          value={volumesNumber}
          onChange={onParamsChange}
        />
      </Flex>
      <Flex>
        <Label htmlFor="testsPerVolume">Тестов на значение</Label>
        <Input
          disabled={isDisabled}
          sx={{ maxWidth: "50px" }}
          name="testsPerVolume"
          type="number"
          value={testsPerVolume}
          onChange={onParamsChange}
        />
      </Flex>
    </Box>
  );
}

export default ParamsConfiguration;
