import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Dashboard from "./Dashboard";

const Home = () => {
  const { isAuth } = useSelector((state) => state.auth);
  if (!isAuth) return <Navigate to="/login" />;
  return (
    <div style={{ margin: "20px" }}>
      <Dashboard />
    </div>
  );
};

export default Home;
