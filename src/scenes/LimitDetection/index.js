import React from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Link, useHistory } from "react-router-dom";
import styled from "@emotion/styled";

import Capture from "./Capture";
import Navigator from "../../components/Navigator";

const Li = styled("li")({
  marginBottom: "4px",
});

function LimitDetection({ onLimitsSet }) {
  let history = useHistory();
  return (
    <Box>
      <Text textAlign="left">
        <ol>
          <Li>Посидите в тишине хотя бы одну минуту</Li>
          <Li>Для начала нужно определить примерные границы вашего слуха</Li>
          <Li>
            Поэтапно уменьшайте уровень громкости, используя кнопки{" "}
            <b>'плюс'</b> и<b>'минус'</b>
          </Li>
          <Li>
            <div>
              Нажмите <b>'Зафиксировать справа'</b> на том уровне, на котором вы
              полностью уверены, что слышите звук
            </div>
            <Box color="#656565">
              (Пример: на -18 я точно слышу звук, а на -17 уже не уверен в этом.
              Значит, мне нужно зафиксировать на -18)
            </Box>
          </Li>
          <Li>Продолжайте уменьшать громкость</Li>
          <Li>
            Нажмите <b>'Зафиксировать слева'</b> на том уровне, на котором вы
            полностью уверены, что <b>НЕ</b> слышите звук
          </Li>
        </ol>
      </Text>
      <Capture onLimitsSet={onLimitsSet} />

      <Navigator>
        <Button mr="20px" onClick={() => history.goBack()}>
          Назад
        </Button>
        <Button as={Link} to="/psyporog/threshold-detection">
          Далее
        </Button>
      </Navigator>
    </Box>
  );
}

export default LimitDetection;
