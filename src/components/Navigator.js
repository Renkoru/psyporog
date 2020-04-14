import React from "react";
import { Flex } from "rebass";

function Navigator({ children }) {
  return (
    <Flex width="100%" bg="grey" py="10px" mt="20px" justifyContent="center">
      {children}
    </Flex>
  );
}

export default Navigator;
