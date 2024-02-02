import "./publish.css";
import axios from "axios";
import { useState } from "react";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);

  const handleValue = (event, target) => {
    if (target === "title") {
      setTitle(event.target.value);
    } else if (target === "description") {
      setDescription(event.target.value);
    } else if (target === "brand") {
      setBrand(event.target.value);
    } else if (target === "size") {
      setSize(event.target.value);
    } else if (target === "color") {
      setColor(event.target.value);
    } else if (target === "condition") {
      setCondition(event.target.value);
    } else if (target === "city") {
      setCity(event.target.value);
    } else if (target === "price") {
      setPrice(event.target.value);
    } else if (target === "picture") {
      setPicture(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("exchange", exchange);

      const { data } = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("data=", data);
    } catch (error) {
      console.log("catch=", error);
    }
  };

  return (
    <div className="main-publish">
      <div className="publish-container crawler">
        <h1>Vends ton article</h1>
        <form className="publish-form" onSubmit={handleSubmit}>
          <div className="pictures-publish">
            <label htmlFor="pictures-publish">
              <span>+</span>Ajoute une photo
            </label>
            <input
              type="file"
              id="pictures-publish"
              name="pictures-publish"
              onChange={(event) => {
                handleValue(event, "picture");
              }}
            />
            {picture && <img src={URL.createObjectURL(picture)} alt="" />}
          </div>
          <div className="article-informations">
            <div className="article-information">
              <label htmlFor="article-title">Titre</label>
              <input
                type="text"
                name="article-title"
                id="article-title"
                placeholder="ex : Chemise Sézane verte"
                value={title}
                onChange={(event) => handleValue(event, "title")}
              />
            </div>
            <div className="article-information">
              <label htmlFor="article-description">Décris ton article</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="ex : porté quelque fois, taille correctement"
              ></textarea>
              <input
                type="text"
                name="article-description"
                id="article-description"
                placeholder="ex : porté quelque fois, taille correctement"
                value={description}
                onChange={(event) => handleValue(event, "description")}
              />
            </div>
          </div>
          <div className="article-features">
            <div className="article-information">
              <label htmlFor="article-brand">Marque</label>
              <input
                type="text"
                name="article-brand"
                id="article-brand"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => handleValue(event, "brand")}
              />
            </div>
            <div className="article-information">
              <label htmlFor="article-size">Taille</label>
              <input
                type="text"
                name="article-size"
                id="article-size"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => handleValue(event, "size")}
              />
            </div>
            <div className="article-information">
              <label htmlFor="article-color">Couleur</label>
              <input
                type="text"
                name="article-color"
                id="article-color"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => handleValue(event, "color")}
              />
            </div>
            <div className="article-information">
              <label htmlFor="article-condition">Etat</label>
              <input
                type="text"
                name="article-condition"
                id="article-condition"
                placeholder="Neuf avec étiquette"
                value={condition}
                onChange={(event) => handleValue(event, "condition")}
              />
            </div>
            <div className="article-information">
              <label htmlFor="article-city">Lieu</label>
              <input
                type="text"
                name="article-city"
                id="article-city"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => handleValue(event, "city")}
              />
            </div>
          </div>
          <div className="article-price-section">
            <div className="article-information">
              <div className="article-price">
                <label htmlFor="article-price">Prix</label>
              </div>
              <div className="price-section-right">
                <input
                  type="text"
                  name="article-price"
                  id="article-price"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => handleValue(event, "price")}
                />
                <div>
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    checked={exchange}
                    onChange={() => setExchange(!exchange)}
                  />
                  <label htmlFor="exchange">
                    Je suis intéressé(e) par les échanges
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button>Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default Publish;
