import { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ token, priceAsc, title, priceMin, priceMax }) => {
  console.log("priceMin=", priceMin);
  console.log("priceMax=", priceMax);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("rechargement données");
        //https://lereacteur-vinted-api.herokuapp.com/
        //https://site--vinted-backend--nh2bbcwygd2q.code.run/
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?sort=price-${
            priceAsc ? "desc" : "asc"
          }${title !== "" ? `&title=${title}` : ""}`
        );
        console.log("response.data=", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [priceAsc, title]);

  console.log("token=", token);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main>
      <div className="hero">
        <div className="crawler">
          <div className="hero-box">
            <p>Prêts à faire du tri dans vos placards ?</p>
            <Link to={"/login"}>Commencer à vendre</Link>
          </div>
        </div>
      </div>
      <div className="offers crawler">
        {data.offers.map((item) => {
          return (
            <Link to={`/offer/${item["_id"]}`}>
              <div className="offer" key={item["_id"]}>
                <div className="user">
                  {item.owner.account.avatar && (
                    <img src={item.owner.account.avatar.url} alt="avatar" />
                  )}

                  <p>{item.owner.account.username}</p>
                </div>
                <img src={item["product_image"].url} alt="product_image" />
                <div className="product-info">
                  <p className="product-price">{item["product_price"]} €</p>
                  <p>{item.product_details[1].TAILLE}</p>
                  <p>{item.product_details[0].MARQUE}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
