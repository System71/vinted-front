import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import { useState } from "react";
import Cookies from "js-cookie";
import Publish from "./pages/Publish/Publish";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [priceAsc, setPriceAsc] = useState(true);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100);

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        setPriceAsc={setPriceAsc}
        priceAsc={priceAsc}
        title={title}
        setTitle={setTitle}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              token={token}
              priceAsc={priceAsc}
              title={title}
              priceMin={priceMin}
              priceMax={priceMax}
            />
          }
        ></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route path="/publish" element={<Publish token={token} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
