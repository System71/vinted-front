import "./payment.css";
import { useLocation, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OgY6REo1TpW3xxjXsvxqLOtJfBH6f2OQxJuVfKLM9R8jQwRlLbA4OQ3WGx1iv1nS0CzmdIokqgOeAGqo9jKhe9K00GboIb2KZ"
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
        <div className="payment-first-part">
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
        </div>
        <div className="payment-second-part">
          <div className="payment-total">
            <p>TOTAL </p>
            <span>{totalPrice} €</span>
          </div>
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir {name}. Vous
            allez payer {totalPrice} € (frais de protection et frais de port
            inclus).
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm name={name} price={price} token={token} />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
