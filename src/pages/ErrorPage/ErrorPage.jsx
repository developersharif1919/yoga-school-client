
import { motion } from 'framer-motion';
import './ErrorPage.css'
import { useNavigate } from 'react-router-dom';
import errorImg from'../../assets/error.png'

const ErrorPage = ({ error }) => {
    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate('/');
    }
    return (
        <div className="error-page">
            <motion.div
                className="error-content"
                initial={{ opacity: 0, y: -80 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, type: 'spring', stiffness: 120 }
                }}
                exit={{ opacity: 0, y: -80 }}
            >
                <div className='flex justify-center'>
                    <img
                        src={errorImg}
                        alt="Error"
                        className="error-image"
                    />
                </div>
                <h1 className="error-title">Oops!  Something Went Wrong</h1>
                <p className="error-message mb-5 mt-2">Please Try Again Leter</p>
                <p className="error-message">{error}</p>
                <button style={{ opacity: '1' }} className="btn  btn-outline btn-primary mt-8" onClick={handleBackToHome}>
                    Back to Home
                </button>
            </motion.div>
        </div>
    );
};

export default ErrorPage;