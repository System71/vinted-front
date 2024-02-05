import axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const register = async (event) => {
    event.preventDefault();
    console.log("register function");
    console.log("newsletter=", newsletter);
    try {
      const response = await axios.post(
        "https://site--vinted-backend--nh2bbcwygd2q.code.run/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log("response.data=", response.data);
      const token = response.data.token;
      console.log("token=", token);
      Cookies.set("token", token);
    } catch (error) {
      console.log(error.response);
    }
  };

  const changeValue = (event, target) => {
    if (target === "username") {
      setUsername(event.target.value);
    } else if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    }
  };

  return (
    <div className="signup">
      <h1>S'inscrire</h1>
      <form id="signup-form" onSubmit={register}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            changeValue(event, "username");
          }}
        />
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
        <div className="newsletter-div">
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          S'inscrire à notre newsletter
          <label htmlFor="newsletter"></label>
        </div>
        <p className="conditions">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button>S'inscrire</button>
        <Link to={"/login"}>Tu as déjà un compte ? Connecte-toi !</Link>
      </form>
    </div>
  );
};

export default Signup;
