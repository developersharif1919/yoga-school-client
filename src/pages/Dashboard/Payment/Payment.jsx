import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
      const paymentSelectedClass = useLoaderData();
      const orginalPrice = paymentSelectedClass.price;
      const price = parseFloat(orginalPrice?.toFixed(2));

      console.log('my Id:',paymentSelectedClass)

    return (
        <div className="w-full">
             <Helmet>
                <title>Yoga School | Payment</title>
            </Helmet>
            <h2 className=" my-8 text-center">Payment Process</h2>
            <div className="mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm paymentSelectedClass={paymentSelectedClass} price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;