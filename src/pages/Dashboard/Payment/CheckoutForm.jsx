import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css'
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }


    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='border p-8'>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button className="btn btn-warning mt-8 px-8 py-4" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;