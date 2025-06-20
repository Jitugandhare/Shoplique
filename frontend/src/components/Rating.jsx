import React, { useState } from 'react'
import "../componentsStyles/Rating.css"



const Rating = ({ value, onRatingChange, disabled }) => {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value || 0)

    const handleMouseEnter = (rating) => {
        if (!disabled) {
            setHoveredRating(rating)
        }
    }

    const handleMouseLeave = (rating) => {
        if (!disabled) {
            setHoveredRating(0)
        }
    }

    const handleClick = (rating) => {
        if (!disabled) {
            setSelectedRating(rating);
            if (onRatingChange) {
                onRatingChange(rating)
            }
        }
    }

    const generateStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoveredRating || selectedRating)

            stars.push(
                <span
                    key={i}
                    className={`star ${isFilled ? "filled" : "empty"}`}
                    onMouseEnter={() => handleMouseEnter}
                    onMouseLeave={() => handleMouseLeave}
                    onClick={handleClick}


                    style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                > ☆</span>
            )
        }
        return stars;
    }


    return (
        <div>
            <div className="rating">{
                generateStars()}
            </div>
        </div>
    )
}

export default Rating