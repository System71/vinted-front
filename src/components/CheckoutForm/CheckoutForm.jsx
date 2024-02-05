import "./checkoutForm.css";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ name, price, token }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: token,
    });
    console.log("stripeResponse=", stripeResponse);

    const stripeToken = stripeResponse.token.id;
    console.log(stripeToken);

    const response = await axios.post("http://localhost:3000/payment", {
      token: stripeToken,
      title: name,
      amount: price,
    });
    console.log("response.data=", response.data);

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Pay</button>
        </form>
      ) : (
        <span>Paiement effectué!</span>
      )}
    </>
  );
};

export default CheckoutForm;
