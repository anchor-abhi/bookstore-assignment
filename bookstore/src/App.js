import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import BookDetail from "./components/BookDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book-details/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
}

export default App;
