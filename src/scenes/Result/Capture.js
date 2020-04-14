import React, { useState, useEffect, useReducer } from "react";
import { Button, Flex, Box, Text } from "rebass";

import { setVolume, sing } from "../../services/tone";

const arrowKeyLeftCode = 37;
const arrowKeyRightCode = 39;

function reducer(state, action) {
  if (action.type === "increase") {
    return state + action.payload;
  }

  if (action.type === "decrease") {
    return state - action.payload;
  }

  return state;
}

function Capture({ onLimitsSet }) {
  const [leftLimit, setLeftLimit] = useState(null);
  const [rightLimit, setRightLimit] = useState(null);
  const [volumeLevel, dispatch] = useReducer(reducer, 0);
  const volumeStep = 1;

  useEffect(() => {
    setVolume(volumeLevel);
    sing();
  }, [volumeLevel]);

  function onVolumeIncrease() {
    dispatch({ type: "increase", payload: volumeStep });
  }

  function onVolumeDecrease() {
    dispatch({ type: "decrease", payload: volumeStep });
  }

  function onFixLeft() {
    setLeftLimit(volumeLevel);
    onLimitsSet([volumeLevel, rightLimit]);
  }

  function onFixRight() {
    setRightLimit(volumeLevel);
    onLimitsSet([leftLimit, volumeLevel]);
  }

  useEffect(() => {
    function onKeypress(event) {
      if (event.keyCode === arrowKeyLeftCode) {
        onVolumeDecrease();
      }
      if (event.keyCode === arrowKeyRightCode) {
        onVolumeIncrease();
      }

      return null;
    }

    document.addEventListener("keydown", onKeypress, false);
    return () => document.removeEventListener("keydown", onKeypress, false);
  }, []);

  return (
    <Box>
      <Text textAlign="center" fontWeight="bold">
        Текущий уровень сигнала: {volumeLevel}
      </Text>
      <Flex my="7px" justifyContent="center">
        <Button mr="10px" width="2em" fontSize={5} onClick={onVolumeDecrease}>
          -
        </Button>
        <Button fontSize={5} width="2em" onClick={onVolumeIncrease}>
          +
        </Button>
      </Flex>
      <Flex mt="20px" justifyContent="center">
        <Button variant="secondary" mr="10px" width="10em" onClick={onFixLeft}>
          Замер 1 {leftLimit && `(${leftLimit})`}
        </Button>
        <Button variant="secondary" width="10em" onClick={onFixRight}>
          Замер 2 {rightLimit && `(${rightLimit})`}
        </Button>
      </Flex>
    </Box>
  );
}

export default Capture;
