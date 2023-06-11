
import useSelectedClasses from '../../../hooks/useSelectedClasses';

const MySelectedClass = () => {
    const [selectedClass] = useSelectedClasses();
    console.log('my Selected Class',selectedClass)
    return (
        <div>
            
        </div>
    );
};

export default MySelectedClass;