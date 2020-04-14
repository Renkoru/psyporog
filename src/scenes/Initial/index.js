import React, { useEffect } from "react";
import { Button, Box, Flex, Text } from "rebass";
import { Link } from "react-router-dom";

function Initial() {
  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      alignContent="center"
    >
      <Text textAlign="center" my="10px">
        Для определения нижнего порога вашего слуха в качестве устройства
        тестирования лучше всего подойдёт телефон (он не шумит).
      </Text>
      <Text textAlign="center" my="10px">
        Сделайте среднюю громкость на вашем устройстве, прежде чем начать.
      </Text>
      <Button fontSize={3} as={Link} to="/psyporog/limit-detection">
        Начать
      </Button>
    </Flex>
  );
}

export default Initial;
