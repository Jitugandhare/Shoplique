import React, { useEffect, useState } from 'react'
import "../componentsStyles/ImageSlider.css"

const images = [
    './Images/Image1.png',
    './Images/Image-1.avif',
    './Images/image4.png',      
    './Images/Image-4.avif',
    './Images/Image-5.avif',


];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 5000)


        return () => clearInterval(interval)

    }, [])


    return (
        <div className="image-slider-container">
            <div className="slider-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {
                    images.map((image, index) => (
                        <div className="slider-item" key={index} >
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                    ))
                }

            </div>
            <div className="slider-dots">
                {
                    images.map((__dirname, index) => (
                        <span className={`dot ${index === currentIndex}? "active":""`} key={index}

                            onClick={() => setCurrentIndex(index)}

                        />

                    ))
                }

            </div>
        </div>
    )
}

export default ImageSlider