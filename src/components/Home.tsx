import React from "react";
import PropTypes from "prop-types";
import { prototype } from "events";
import Table from "./Table/Table";

function Home() {
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <Table table_name={"Flavanoids"} />
      <Table table_name={"Gamma"} />
      {/* <Table table_name={"Malic Acid"} />
      <Table table_name={"Total phenols"} /> */}
    </div>
  );
}

export default Home;
  