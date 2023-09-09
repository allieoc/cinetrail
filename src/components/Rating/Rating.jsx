import React from 'react'
import './Rating.css'
import StarRatings from 'react-star-ratings';

function Rating({movieRating}) {
  return (
    <div className="rating">
        <StarRatings 
            rating={movieRating}
            starRatedColor='#e50916'
            numberOfStars={5}
            name='rating'
            starDimension='15px'
            starSpacing='1px'
            starEmptyColor='grey'
        />
    </div>
  )
}

export default Rating