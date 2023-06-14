import { useContext } from 'react';
import { Helmet} from 'react-helmet-async';
import { AuthContext } from '../../../providers/AuthProvider';
import PopularClasses from './PopularClasses/PopularClasses';
import PopularInstructors from './PopularInstructors/PopularInstructors';
import NewsLetter from './NewsLetter/NewsLetter';
import Slider from './Slider/Slider';

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
            <Slider></Slider>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;