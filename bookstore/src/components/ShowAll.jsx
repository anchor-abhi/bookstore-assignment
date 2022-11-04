import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ShowAll({ total, setTotal }) {
  const [books, setBooks] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get(`http://localhost:5000/book?page=${page}`).then((res) => {
      setBooks(res.data.books);
      setTotal(res.data.total);
    });
  }, [page]);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:5000/book/${id}`).then((res) => {
      axios.get(`http://localhost:5000/book?page=${page}`).then((res) => {
        setBooks(res.data.books);
        setTotal(res.data.total);
      });
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Price&nbsp;(g)</TableCell>
            <TableCell align="right">No. of times issued</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(({ _id, title, issued, price, author }) => (
            <>
              <TableRow
                key={_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell
                  onClick={() => navigate(`book-details/${_id}`)}
                  align="right"
                >
                  {author}
                </TableCell>
                <TableCell
                  onClick={() => navigate(`book-details/${_id}`)}
                  align="right"
                >
                  {price} INR
                </TableCell>
                <TableCell
                  onClick={() => navigate(`book-details/${_id}`)}
                  align="right"
                >
                  {issued}
                </TableCell>
                <TableCell align="right">
                  <button onClick={() => handleDelete(_id)}>Delete</button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button>{page}</button>
      <button
        disabled={page === Math.ceil(total / 10)}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </TableContainer>
  );
}
