
import { motion } from 'framer-motion';


const NewsLetter = () => {


    return (
        <div style={{ border: '2px solid blue' }} className="newsletter  my-16">
            <h2 className='text-center text-5xl my-5'>Subscribe to Our Newsletter</h2>
            <form>
                <input type="email" placeholder="Enter your email" />
                <motion.button
                    type="submit"
                    className="newsletter-button btn-primary"
                    whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        transition: { duration: 1, repeat: Infinity }
                    }}
                >
                    Subscribe
                </motion.button>
            </form>
        </div>
    );
};

export default NewsLetter;