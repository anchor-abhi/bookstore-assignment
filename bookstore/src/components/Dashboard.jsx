import React, { useEffect, useState } from "react";
import AddBook from "./AddBook";
import ShowAll from "./ShowAll";

const Dashboard = () => {
  const [total, setTotal] = useState(0);
  const [option, setOption] = useState(1);

  return (
    <div
      className="dashboard"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <h6>Total Books : {total}</h6>
        <h6 onClick={() => setOption(1)}>Show All Books</h6>
        <h6 onClick={() => setOption(2)}>Add a new Book</h6>
      </div>
      <div>
        {option === 1 ? (
          <ShowAll total={total} setTotal={setTotal} />
        ) : option === 2 ? (
          <AddBook setTotal={setTotal} />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
