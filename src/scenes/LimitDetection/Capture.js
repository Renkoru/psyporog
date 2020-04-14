import React, { useState, useEffect, useReducer } from "react";
import { Button, Flex, Box } from "rebass";

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
      <Box>Current level: {volumeLevel}</Box>
      <Button onClick={onVolumeDecrease}>-</Button>
      <Button onClick={onVolumeIncrease}>+</Button>
      <Flex m="10px">
        <Button mr="10px" onClick={onFixLeft}>
          Зафиксировать слева {leftLimit && `(${leftLimit})`}
        </Button>
        <Button onClick={onFixRight}>
          Зафиксировать справа {rightLimit && `(${rightLimit})`}
        </Button>
      </Flex>
    </Box>
  );
}

export default Capture;
