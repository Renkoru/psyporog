import React, { useState } from "react";
import { Button, Box, Text, Flex } from "rebass";

function ProcessDetails({ progress, result }) {
  const [isHidden, setHidden] = useState(true);

  function onToggle() {
    setHidden((s) => !s);
  }

  let sorted = Object.keys(progress);
  sorted = sorted.sort((x, y) => parseInt(x) - parseInt(y));
  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      alignContent="center"
      bg="#d0d0d0"
      width="100%"
    >
      <Box
        sx={{ border: "1px solid black", borderRadius: "5px" }}
        p="5px"
        my="10px"
        textAlign="center"
        onClick={onToggle}
      >
        {isHidden
          ? "Показать детали подсчёта (для проверки алгоритма)"
          : "Скрыть"}
      </Box>
      {!isHidden && (
        <table>
          <thead>
            <tr>
              <th>Уровень</th>
              <th>Обработанно</th>
              <th>Услышанно</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((i) => (
              <tr style={{ textAlign: "center" }} key={i}>
                <td>{i}</td>
                <td>{progress[i]}</td>
                <td>{result[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Flex>
  );
}

export default ProcessDetails;
