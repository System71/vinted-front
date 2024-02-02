import "./offer.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        console.log("response.data=", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div className="main-offer">
      <img src={data.product_image.url} alt="product image" />
      <div className="content">
        <p className="price-offer">{data.product_price} €</p>

        {/* Faire un map sur le tableau des infos !!!!!!! */}
        <div className="content-infos">
          <div className="categories-offer">
            <p>MARQUE</p>
            <p>TAILLE</p>
            <p>ETAT</p>
            <p>COULEUR</p>
            <p>EMPLACEMENT</p>
          </div>
          <div className="categories-infos">
            <p>{data["product_details"][0].MARQUE}</p>
            <p>{data["product_details"][1].TAILLE}</p>
            <p>{data["product_details"][2].ÉTAT}</p>
            <p>{data["product_details"][3].COULEUR}</p>
            <p>{data["product_details"][4].EMPLACEMENT}</p>
          </div>
        </div>
        <div className="description-offer">
          <p className="productname-offer">{data["product_name"]}</p>
          <p className="description-text">{data["product_description"]}</p>
          <div className="user-offer">
            {data.owner.account.avatar && (
              <img src={data.owner.account.avatar.url} alt="avatar" />
            )}
            <p>{data.owner.account.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
