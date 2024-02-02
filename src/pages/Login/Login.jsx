import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.token;
      // console.log("token=", token);
      Cookies.set("token", token);
      setToken(token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  const changeValue = (event, target) => {
    if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    }
  };

  return (
    <div className="login">
      <h1>Se connecter</h1>
      <form id="login-form" onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            changeValue(event, "email");
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            changeValue(event, "password");
          }}
        />
        <button>S'inscrire</button>
        <Link to={"/signup"}>Pas encore de compte ? Inscris-toi !</Link>
      </form>
    </div>
  );
};

export default Login;
