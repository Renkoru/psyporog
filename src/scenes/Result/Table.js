import React from "react";

function Table({ data }) {
  let sorted = Object.keys(data);
  sorted = sorted.sort((x, y) => parseInt(x) - parseInt(y));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Уровень</th>
            {/* <th>Обработанно</th> */}
            <th>Услышано</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((i) => (
            <tr style={{ textAlign: "center" }} key={i}>
              <td>{i}</td>
              {/* <td>{progress[i]}</td> */}
              <td>{data[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
