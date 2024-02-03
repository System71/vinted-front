import "./header.css";
import logo from "../../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
// import PriceSort from "../priceSort/priceSort.jsx";

const Header = ({
  token,
  setToken,
  priceAsc,
  setPriceAsc,
  setTitle,
  title,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
}) => {
  const [values, setValues] = useState([0, 100]);
  setPriceMin(values[0]);
  setPriceMax(values[1]);

  const navigate = useNavigate();

  const disconnect = () => {
    console.log("deconnexion");
    console.log("token disconnect=", token);
    Cookies.remove("token");
    setToken(null);
    navigate("/");
  };
  return (
    <header className="crawler">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="search">
        <div className="searchbar">
          <FontAwesomeIcon icon="magnifying-glass" />
          <input
            type="text"
            placeholder="Recherche des articles"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="sortby">
          <p>Trier par prix</p>
          <input
            type="checkbox"
            name="price-sort"
            id="price-sort"
            onChange={() => {
              setPriceAsc(!priceAsc);
            }}
          />
          <p>Prix entre :</p>
          {/* <PriceSort
            values={values}
            setValues={setValues}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
            priceMin={priceMin}
            priceMax={priceMax}
          /> */}
        </div>
      </div>
      <div className="menu">
        <div className="left-menu">
          {token ? (
            <button className="button-disconnect" onClick={disconnect}>
              Se déconnecter
            </button>
          ) : (
            <>
              <Link className="button-menu" to="/signup">
                S'inscrire
              </Link>
              <Link className="button-menu" to="/login">
                Se connecter
              </Link>
            </>
          )}
        </div>
        <div className="right-menu">
          <Link className="button-sell" to="/publish">
            Vends tes articles
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
