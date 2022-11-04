import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const BookDetail = () => {
  const { id } = useParams();
  const [det, setDet] = useState({
    author: "",
    price: "",
    issued: "",
    title: "",
  });

  const [disable, setDisable] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:5000/book/${id}`).then((res) => {
      const data = res.data;
      console.log("data", data);
      setDet({ ...det, ...data });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDet({ ...det, [name]: value });
  };
  const handleEdit = () => {
    setDisable(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:5000/book/${id}`, det).then((res) => {
      axios.get(`http://localhost:5000/book/${id}`).then((res) => {
        const data = res.data;
        console.log("data", data);
        setDet({ ...det, ...data });
        setDisable(true);
      });
    });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <h1>Book Details</h1>
        <button style={{ padding: "5px" }} onClick={handleEdit}>
          Edit Details
        </button>
      </div>
      <div className="bookDet" style={{ width: "60%", padding: "20px" }}>
        <div>
          <h2>Title : </h2>
          <input
            onChange={handleChange}
            name="title"
            value={det.title}
            disabled={disable}
          />
        </div>
        <div>
          <h2>Author : </h2>

          <input
            onChange={handleChange}
            name="author"
            value={det.author}
            disabled={disable}
          />
        </div>
        <div>
          <h2>Price : </h2>
          <input
            onChange={handleChange}
            name="price"
            type="number"
            value={det.price}
            disabled={disable}
          />
        </div>
        <div>
          <h2>Issued : </h2>
          <h4>
            <input
              onChange={handleChange}
              name="issued"
              type="number"
              value={det.issued}
              disabled={disable}
            />
          </h4>
          <p>times</p>
        </div>
        {!disable && (
          <button style={{ padding: "5px" }} onClick={handleUpdate}>
            Update Details
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
