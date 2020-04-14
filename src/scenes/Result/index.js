import round from "lodash/fp/round";
import isNull from "lodash/fp/isNull";

import React, { useState } from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Link, useHistory } from "react-router-dom";

import FormInput from "../../components/FormInput";
import Navigator from "../../components/Navigator";
import Table from "./Table";
import Capture from "./Capture";

import { setVolume, sing } from "../../services/tone";

function Result({ data }) {
  let history = useHistory();
  const [level, setLevel] = useState(0);
  const [volumesData, setVolumesData] = useState({
    volume1: null,
    volume2: null,
  });
  const [dbData, setDbData] = useState({
    my: 0,
    db1: 0,
    db2: 0,
  });

  function onLevelChange(event) {
    const { value } = event.target;
    setLevel(value);
  }

  function onVolumesChange([volume1, volume2]) {
    // const { value, name } = event.target;

    setVolumesData({
      volume1,
      volume2,
    });
  }

  function onDbChange(event) {
    const { value, name } = event.target;

    setDbData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function onPlay() {
    setVolume(dbData.my);
    sing();
  }

  const dbPerLevel =
    (dbData.db2 - dbData.db1) / (volumesData.volume2 - volumesData.volume1);

  const myDblevel =
    dbData.db1 - dbPerLevel * Math.abs(dbData.my - volumesData.volume1);

  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      alignContent="center"
    >
      <Text mb="15px" textAlign="center">
        В таблице ниже найдите тот уровень, который вы услышали больше всего раз
        (колонка "Услышано")
      </Text>
      <Table data={data} />

      <Text mb="15px" textAlign="center">
        Можете перевести этот уровень в децибелы. Для этого вам понадобится
        измеритель громкости (например, приложение Шумометр для телефона).
      </Text>
      <Text mb="15px" textAlign="center">
        Для расчетов нужно сделать два замера с достаточным уровнем громкости и
        указать их уровень в децибелах. (Замер 1 должен быть меньше по значению,
        чем Замер 2. Они должны быть больше 0. Увеличивайте громкость,
        используюя кнопку "+")
      </Text>
      <Text mb="15px" textAlign="center">
        Чтобы сделать замер, нужно включить Шумометр и, нажимая на кнопку "+",
        записать его показания на определённом уровне. Эти показания нужно будет
        внести ниже.
      </Text>
      <Box my="10px">
        <Capture onLimitsSet={onVolumesChange} />

        <FormInput
          label={`Уровень децибел для ${
            isNull(volumesData.volume1) ? "?" : volumesData.volume1
          }`}
          name="db1"
          value={dbData.db1}
          type="number"
          onChange={onDbChange}
        />

        <FormInput
          label={`Уровень децибел для ${
            isNull(volumesData.volume2) ? "?" : volumesData.volume2
          }`}
          name="db2"
          value={dbData.db2}
          type="number"
          onChange={onDbChange}
        />
      </Box>

      <Box width="70%">
        <Text>
          В результате измерений в одной единице {dbPerLevel} децибел, введите
          свой уровень его эквивалент в децибелах
        </Text>

        <FormInput
          label="Мой уровень"
          name="my"
          value={dbData.my}
          type="number"
          onChange={onDbChange}
        />

        <Text>Ваш порог: {myDblevel} децибел</Text>
        <Button onClick={onPlay}>Проиграть</Button>
      </Box>

      <Navigator>
        <Button mr="20px" onClick={() => history.goBack()}>
          Назад
        </Button>
        <Button as={Link} to="/psyporog/">
          Сначала
        </Button>
      </Navigator>
    </Flex>
  );
}

export default Result;
