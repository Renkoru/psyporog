import React, { useEffect } from "react";
import { Button, Flex } from "rebass";
import { Link } from "react-router-dom";

function Initial() {
  return (
    <Flex>
      <Link to="/limit-detection">Начать</Link>
    </Flex>
  );
}

export default Initial;
