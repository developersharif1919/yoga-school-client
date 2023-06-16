import { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming you have three slides
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider-container my-16 " style={{ height: '700px' }}>
            <div
                id="slide1"
                className={`carousel-item bg-1 carousel-bg bg-1 ${slideIndex === 0 ? 'active' : ''}`}
            >
                <div style={{ width: '90%', position: 'relative', top: '0', right: '0' }} className="flex mobile-device md:flex-row lg:flex-row mx-auto items-center justify-between">
                    <div className="w-1/2">
                    <img className="" src="https://i.ibb.co/CwJ2Zsr/Screen-Shot-2017-11-26-at-9-22-17-PM.png" alt="Slide 2" />
                    </div>
                    <div style={{ boxSizing: 'border-box' }} className="text-center w-1/2 text-white">
                        <h2 className='text-orange-600 text-3xl mb-5 font-bold'>Vinyasa Yoga</h2>
                        <p className='text-black'>Vinyasa, also known as flow yoga, is a dynamic style characterized by continuous movement and smooth transitions between poses. It synchronizes breath with movement, creating a fluid and energetic practice that builds strength, flexibility, and cardiovascular endurance</p>
                        <p className='text-black'>
                            Message: Yoga encourages self-reflection and introspection, aiding in emotional healing and balance. Through breathwork and meditation, it helps manage emotions, develop resilience, and cultivate a positive outlook on life.
                        </p>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>

            <div
                id="slide2"
                className={`carousel-item carousel-bg bg-2 ${slideIndex === 1 ? 'active' : ''}`}

            >
                <div style={{ width: '90%', position: 'relative', top: '0', right: '0' }} className="flex mobile-device  mx-auto items-center justify-between">
                    <div className="w-1/2">
                        <img className="" src="https://i.ibb.co/qm49dZt/Upward-facing-dog-Urdhva-Mukha-Svanasana-art-of-living-blog.jpg" alt="Slide 2" />
                    </div>
                    <div style={{ boxSizing: 'border-box' }} className="text-center w-1/2 text-white">
                        <h2 className='text-orange-600 text-3xl mb-5 font-bold'>Discover the Power of Yoga</h2>
                        <p className='text-black'>Welcome to the world of yoga, a holistic practice that promotes physical and mental well-being. Originating in ancient India, yoga has gained immense popularity worldwide for its numerous health benefits and ability to cultivate inner peace. Whether you're a beginner or an experienced practitioner, yoga offers something for everyone.</p>
                        <p className='text-black'>
                            Message:
                            "Embrace the transformative power of yoga and embark on a journey of self-discovery. Let go of stress, find balance, and connect with your inner self. Start your yoga practice today and unlock a world of health and harmony. Namaste!"
                        </p>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>

            <div
                id="slide3"
                className={`carousel-item carousel-bg bg-3 ${slideIndex === 2 ? 'active' : ''}`}
            >
                <div style={{ width: '90%', position: 'relative', top: '0', right: '0' }} className="flex mobile-device  mx-auto items-center justify-between">
                    <div className="w-1/2">
                        <img className="" src="https://i.ibb.co/MhsykX0/Restorative-Yoga-3.jpg" alt="Slide 3" />
                    </div>
                    <div style={{ boxSizing: 'border-box' }} className="text-center w-1/2 text-white">
                        <h2 className='text-orange-600 text-3xl mb-5 font-bold'>Ashtanga Yoga</h2>
                        <p className='text-black'>Ashtanga yoga is a more vigorous and structured style that follows a specific sequence of poses. It focuses on synchronized breath and movement, and practitioners progress through a set series of poses at their own pace. Ashtanga yoga builds strength, flexibility, and stamina.</p>
                        <p className='text-black'>
                            Message: Yoga is not just a physical exercise; it is a path towards self-awareness and personal growth. It teaches us to be present in the moment, to listen to our bodies, and to cultivate a deep sense of gratitude for ourselves and the world around us.
                        </p>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Slider;
