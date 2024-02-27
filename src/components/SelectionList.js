import React from "react";
import "./SelectionList.css";

function SelectionList({ selected_table, set_selected_table }) {
  function handleCheck(id) {
    return () => {
      let my_table = selected_table.filter((ele) => ele.id == id);
      let rest_table = selected_table.filter((ele) => ele.id != id);

      set_selected_table(
        [
          ...rest_table,
          {
            ...my_table[0],
            status: !my_table[0].status,
          },
        ].sort((a, b) => a.id - b.id)
      );
    };
  }

  return (
    <div className="selection_main">
      <h4>Selection Table</h4>
      {selected_table?.map((ele) => {
        return (
          <div>
            <input
              type="checkbox"
              checked={ele.status}
              onClick={handleCheck(ele.id)}
            />
            <label
              style={{
                marginLeft: "5px",
              }}
            >
              {ele.table_name}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default SelectionList;
