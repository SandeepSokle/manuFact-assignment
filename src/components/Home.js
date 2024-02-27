import React, { useState } from "react";
import PropTypes from "prop-types";
import { prototype } from "events";
import Table from "./Table/Table";
import SelectionList from "./SelectionList";

function Home() {
  const [selected_table, set_selected_table] = useState([
    {
      id: 1,
      table_name: "Flavanoids",
      status: true,
    },
    {
      id: 2,
      table_name: "Gamma",
      status: true,
    },
    {
      id: 3,
      table_name: "Malic Acid",
      status: false,
    },
    {
      id: 4,
      table_name: "Magnesium",
      status: false,
    },
    {
      id: 5,
      table_name: "Color intensity",
      status: false,
    },
    {
      id: 6,
      table_name: "Total phenols",
      status: false,
    },
    {
      id: 7,
      table_name: "Proanthocyanins",
      status: false,
    },
  ]);

  console.log({ selected_table });

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <SelectionList
        selected_table={selected_table}
        set_selected_table={set_selected_table}
      />

      {selected_table
        ?.filter((ele) => ele.status == true  )
        .map((ele) => {
          return <Table table_name={ele.table_name} />;
        })}

      {/* <Table table_name={"Gamma"} /> */}
      {/* <Table table_name={"Malic Acid"} />
      <Table table_name={"Total phenols"} /> */}
    </div>
  );
}

export default Home;
