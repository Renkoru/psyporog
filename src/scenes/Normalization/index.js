import React from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Link, useHistory } from "react-router-dom";

function Normalization() {
  let history = useHistory();
  return (
    <div>
      Normalization
      <Button mr="20px" onClick={() => history.goBack()}>
        Назад
      </Button>
      <Link to="/psyporog/">Сначала</Link>
    </div>
  );
}

export default Normalization;
