import "./payment.css";
import { useLocation, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
  const location = useLocation();
  const { name, price } = location.state;
  const protectionPrice = price * 0.1;
  const shippingFees = price * 0.2;
  const totalPrice = price + protectionPrice + shippingFees;

  return token ? (
    <div className="payment">
      <div className="payment-container crawler">
        <h4>Résumé de la commande</h4>
        <div>
          <p>Commande</p>
          <span>{price} €</span>
        </div>
        <div>
          <p>Frais protection acheteurs</p>
          <span>{protectionPrice} €</span>
        </div>
        <div>
          <p>Frais de port</p>
          <span>{shippingFees} €</span>
        </div>
        <div>
          <p>TOTAL </p>
          <span>{totalPrice} €</span>
        </div>
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir {name}. Vous allez
          payer {totalPrice} € (frais de protection et frais de port inclus).
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm name={name} price={price} />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
