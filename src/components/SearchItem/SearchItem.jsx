import React from 'react'
import './SearchItem.css'
import { Link, useNavigate } from 'react-router-dom'
import noImage from "/noImage.png"

function SearchItem({movie,setQuery}) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);


  const handleNagivation=()=>{ 
    setQuery('')
    navigate(`/moviedetails/${movie.id}`)
  }
return (
  <div className="search-results-item" onClick={handleNagivation} >
      <img className="result-img" src={imageError ? noImage :`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
         onError={() => setImageError(true)}/>
      <p>{movie.title}</p> 
  </div>
)
}

export default SearchItem