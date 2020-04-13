import React from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Link, useHistory } from "react-router-dom";

function Result() {
  let history = useHistory();
  return (
    <div>
      Result
      <Box>
        <Button mr="20px" onClick={() => history.goBack()}>
          Назад
        </Button>
        <Link to="/normalization">Далее</Link>
      </Box>
    </div>
  );
}

export default Result;
