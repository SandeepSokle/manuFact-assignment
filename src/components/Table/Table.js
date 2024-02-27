import React, { useEffect, useState } from "react";
import "./Table.css";
import fetch_my_table from "../utility/utilityfunctions";

function Table({ table_name }) {
  const [table_data, set_table_data] = useState({
    classes: [],
    mean: [],
    median: [],
    mode: [],
  });

  useEffect(() => {
    const data = fetch_my_table({ table_name });
    set_table_data(data);
  }, [table_name]);

  return (
    <div className="table_main">
      <h1>{table_name} Statistical Measures </h1>
      <table>
        <tr>
          <th>Measure</th>
          {table_data?.classes.map((ele) => {
            return <th>Alcohol {ele}</th>;
          })}
        </tr>
        <tr>
          <th>{table_name} Mean</th>
          {table_data?.mean.map((ele) => {
            return <td>{ele}</td>;
          })}
        </tr>
        <tr>
          <th>{table_name} Median</th>
          {table_data?.median.map((ele) => {
            return <td>{ele}</td>;
          })}
        </tr>
        <tr>
          <th>{table_name} Mode</th>
          {table_data?.mode.map((ele) => {
            return <td>{ele}</td>;
          })}
        </tr>
      </table>
    </div>
  );
}

export default Table;
