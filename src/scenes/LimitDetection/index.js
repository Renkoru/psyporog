import React from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Link, useHistory } from "react-router-dom";

import Capture from "./Capture";

function LimitDetection({ onLimitsSet }) {
  let history = useHistory();
  return (
    <Box>
      <Text>
        <div>Шаг 1:</div>
        <ol>
          <li>Посидите в тишине хотя бы одну минуту.</li>
          <li>
            На первом этапе нам нужно определить примерные границы вашего слуха
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
        <pre></pre>
      </Text>
      <Capture onLimitsSet={onLimitsSet} />
      <Box>
        <Button mr="20px" onClick={() => history.goBack()}>
          Назад
        </Button>
        <Link to="/psyporog/threshold-detection">Далее</Link>
      </Box>
    </Box>
  );
}

export default LimitDetection;
