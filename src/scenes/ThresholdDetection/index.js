import React, { useEffect, useState, useReducer } from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Link, useHistory } from "react-router-dom";

import Navigator from "../../components/Navigator";
import { setVolume, sing } from "../../services/tone";
import ParamsConfiguration from "./ParamsConfiguration";
import ProcessDetails from "./ProcessDetails";

import {
  initialState,
  reducer,
  init,
  markYes,
  markNo,
  enable,
  start,
} from "./store";

function ThresholdDetection({ leftLimit, rightLimit, onResult }) {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [parameters, setParameters] = useState({
    volumesNumber: 5,
    testsPerVolume: 6,
  });

  useEffect(() => {
    dispatch(
      init(
        leftLimit,
        rightLimit,
        parameters.volumesNumber - 1,
        parameters.testsPerVolume
      )
    );
  }, [parameters]);

  useEffect(() => {
    if (!state.isStarted) {
      return () => {};
    }
    setVolume(state.volumeLevel);
    sing();
    const timer = setTimeout(() => dispatch(enable()), 1300);
    return () => clearTimeout(timer);
  }, [state.currentTry]);

  function onParamsChange(data) {
    console.log(data);
    setParameters(data);
  }

  function onStart() {
    dispatch(start());
  }

  function onYes() {
    dispatch(markYes());
  }

  function onNo() {
    dispatch(markNo());
  }

  function onNext() {
    onResult(state.result);
    history.push("/psyporog/result");
  }

  const isSoundButtonsDisabled = state.isDisabled || state.isFinished;

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <Box mb="20px" width="100%">
        <Text textAlign="center">
          Вам будет проигрываться звук со случайной громкостью, диапазон которой
          мы определили на предыдущем этапе. Этот диапазон сейчас разбит на{" "}
          <b>{parameters.volumesNumber || "?"}</b> уровней. Можете поменять это
          значение ниже в 'Количестве уровней'.
        </Text>
        <Text textAlign="center">
          Каждый уровень будет проигран ровно{" "}
          <b>{parameters.testsPerVolume || "?"}</b> раз. Это значение тоже можно
          изменить.
        </Text>
      </Box>

      <ParamsConfiguration
        isDisabled={state.isStarted}
        volumesNumber={parameters.volumesNumber}
        testsPerVolume={parameters.testsPerVolume}
        onChange={onParamsChange}
      />
      <ProcessDetails progress={state.progress} result={state.result} />

      <Box my="10px" fontWeight="bold">
        Прослушанно {state.currentTry} звуков из{" "}
        {parameters.volumesNumber * parameters.testsPerVolume}
      </Box>
      <Box>
        <Button disabled={state.isStarted} mr="20px" onClick={onStart}>
          Начать
        </Button>
      </Box>
      <Box my="20px">
        <Button
          width="8em"
          disabled={isSoundButtonsDisabled}
          mr="20px"
          onClick={onNo}
        >
          Не слышно
        </Button>
        <Button
          width="8em"
          disabled={isSoundButtonsDisabled}
          mr="20px"
          onClick={onYes}
        >
          Слышно
        </Button>
      </Box>
      {state.isFinished && (
        <Box>Тесты закончились, переходите на следующий шаг</Box>
      )}

      <Box width="100%">
        <Navigator>
          <Button mr="20px" onClick={() => history.goBack()}>
            Назад
          </Button>
          <Button onClick={onNext}>Далее</Button>
        </Navigator>
      </Box>
    </Flex>
  );
}

export default ThresholdDetection;
