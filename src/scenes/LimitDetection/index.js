import React from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Link, useHistory } from "react-router-dom";

import Capture from "./Capture";
import Navigator from "../../components/Navigator";

function LimitDetection({ onLimitsSet }) {
  let history = useHistory();
  return (
    <Box>
      <Text textAlign="center">
        <div>Шаг 1:</div>
        <Text textAlign="left">
          <ol>
            <li>Посидите в тишине хотя бы одну минуту.</li>
            <li>
              На первом этапе нам нужно определить примерные границы вашего
              слуха
            </li>
            <li>
              Поэтапно уменьшайте уровень громкости использу кнопки стрелочки
            </li>
            <li>
              Нажмите на кнопку "Зафиксировать справа" на последнем уровне когда
              вы полностью уверенны, что слышите звук
            </li>
            <li>
              Нажмите на кнопку "Зафиксировать слева" на первом уровне когда вы
              полностью уверенны, что НЕ слышите звук
            </li>
          </ol>
        </Text>
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
