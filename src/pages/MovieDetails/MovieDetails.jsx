import React, {useContext, useEffect, useState} from 'react'
import './MovieDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ReactPlayer from 'react-player';
import StarRatings from 'react-star-ratings';
import Genres from '../../components/Genres/Genres';
import { ThemeContext} from '../../contexts/ThemeContext';
import { UserContext } from '../../contexts/UserContext';

function MovieDetails({apiKey, baseUrl, serverUrl}) {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const { movieId } = useParams();
    const {user, setUser} = useContext(UserContext);
    const [reviews, setReviews] = useState([]);
    const [numReviewsToShow, setNumReviewsToShow] = useState(3);
    const [totalNumReviews, setTotalNumReviews] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState("");
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        axios.post("https://cinetrain-server.herokuapp.com/favoriteMovies/search", {
        user_id:user?._id, 
        tmdb_id:movie?.id
      })
      .then((res)=>{
        if(res.data !== null){
            setIsFavorite(true);
        }    
    })
      .catch(err=>console.log(err))
      .finally(()=>setIsLoaded(true));

    }, [user, movie])

    useEffect(()=>{
        

        axios(
            `${import.meta.env.VITE_BASE_URL}/movie/${movieId}?api_key=${
                import.meta.env.VITE_API_KEY
            }`
        )
        .then((res) => setMovie(res.data))
        .catch((err) => console.log(err));

        axios(
            `${import.meta.env.VITE_BASE_URL}/movie/${movieId}/videos?api_key=${
                import.meta.env.VITE_API_KEY
            }`
            )
            .then((res) => {
                //console.log(res.data.results)
                
                const trailers = res.data.results.filter((video) => 
                    video.type === "Trailer" && video.site === "YouTube"
                )
                setTrailerKey(trailers[0].key)
            })
            .catch((err) => console.log(err))
    }, []);

    const addtoFavorites = () =>{
        axios.post("https://cinetrail-server.herokuapp.com/favoriteMovies", {
            user_id: user?._id,
            movie_id: movie?.id
        })
        .then(res=>setIsFavorite(true))
        .catch(err=>console.log(err))
    }

    const removeFromFavorites = () => {
        axios.delete(`https://cinetrail-server.herokuapp.com/favoriteMovies/${user?._id}/${movie?.id}`)
        .then(res=>setIsFavorite(false)).catch(err=>console.log(err));
    }



  return (
    <div className={`movie-details-container ${!darkMode && "details-light"}`}>
        <div className="trailer-container">
            <ReactPlayer
                className="trailer-player"
                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                width="100%"
                height="100%"
                config={{
                    youtube: {
                        playerVars: {
                            showInfo: 1,
                            origin: "https:localhost:5173",
                        },
                    },
                }}
            />
        </div>
        <div className="details-container">
            <div className={`title-container ${!darkMode && "details-light"}`}>
                <h1>{movie?.title}</h1>
                {isLoaded && isFavorite 
                ? 
                <span className="remove-btn" onClick={removeFromFavorites}>Remove from Favorites</span>
                : 
                <span className="add-btn" onClick={addtoFavorites}>Add to Favorites</span>
                }
            </div>
            <div className="rating">
                {movie && (
                <StarRatings 
                    starRatedColor="red" 
                    numberOfStars={5} 
                    starDimension='15px' 
                    starSpacing='1px' 
                    rating={movie?.vote_average/2}
                    name="rating"
                />
                )}
            </div>
            <div className={`info-container ${!darkMode && "details-light"}`}>
                {movie && (
                    <img 
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`} 
                        alt={`Moimport { UserContext } from '../../contexts/UserContext';
vie poster for ${movie.title}`}
                        className="details-poster"
                    /> 
                )}
                <div className="movie-info">
                    <h4>{movie?.tagline}</h4>
                    <h4>{movie?.overview}</h4>
                    <h4>Status:&nbsp; {movie?.status}</h4>
                    <h4>Runtime:&nbsp; {movie?.runtime}&nbsp; min</h4>
                    <h4>Budget:&nbsp; {movie?.budget}</h4>
                    <Genres />
                </div>
            </div>
            <div className={`review-container ${!darkMode && "details-light"}`}>
          <p className="reviews-title">Reviews</p>
          {reviews.slice(0, numReviewsToShow).map((review) => (
            <ReviewItem key={review?.id} review={review} />
          ))}
          {numReviewsToShow < totalNumReviews ? (
            <p
              className="review-number"
              onClick={() => setNumReviewsToShow((prevState) => prevState + 3)}
            >
              <em>Read More Reviews</em>
            </p>
          ) : (
            <p className="review-number" onClick={() => setNumReviewsToShow(3)}>
              <em>End of Reviews. Collapse</em>
            </p>
          )}
        </div>
        </div>
    </div>
  )
}

export default MovieDetails