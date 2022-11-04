import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddBook = ({ setTotal }) => {
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    title: "",
    author: "",
    issued: "",
    title: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE}/book`, data, { headers: { token } })
      .then((res) => {
        axios
          .get(`${process.env.REACT_APP_BASE}/book`, { headers: { token } })
          .then((res) => {
            setTotal(res.data.total);
          });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="title"
          type="text"
          placeholder="Title"
        />{" "}
        <br />
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="author"
          placeholder="Author"
        />{" "}
        <br />
        <br />
        <input
          onChange={handleChange}
          type="number"
          name="price"
          placeholder="Price"
        />{" "}
        <br />
        <br />
        <input
          onChange={handleChange}
          type="number"
          name="issued"
          placeholder="Issued (No. of times)"
        />{" "}
        <br /> <br />
        <input type="submit" /> <br />
      </form>
    </div>
  );
};

export default AddBook;
