import { useContext } from 'react';
import { Helmet} from 'react-helmet-async';
import { AuthContext } from '../../../providers/AuthProvider';

const Home = () => {
    const {loading} = useContext(AuthContext);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        )
    }
    return (
        <div>
            <Helmet>
                <title>Yoga School | Home</title>
            </Helmet>
            <h2>This Is Home</h2>
        </div>
    );
};

export default Home;