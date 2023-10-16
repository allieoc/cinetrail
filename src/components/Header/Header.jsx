import React, {useContext, useState, useEffect} from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import {MdOutlineLightMode, MdOutlineDarkMode} from "react-icons/md"
import { ThemeContext } from '../../contexts/ThemeContext'
import axios from 'axios'
import SearchItem from '../SearchItem/SearchItem'
import { UserContext } from '../../contexts/UserContext';

function Header({baseUrl, apiKey}) {
    const navigate = useNavigate();
    const  {darkMode, setDarkMode} = useContext(ThemeContext);
    const {token, setToken, user, setUser} = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
      

        if (query.trim().length > 0) {
          axios
            .get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
            .then((res) => {
              setSearchResults(res.data.results);
            })
            .catch((err) => console.log(err));
        }
      }, [query]);


      const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser("");
        setToken("");
        navigate("/")

      }

  return (
    <div className={`header-container ${!darkMode && "header-light"}`}>
        <Link className='logo' to='/'>
            CineTrail
        </Link>
        <div className="search-container">
            <input
                type="text"
                value={query}
                placeholder='Search movies...'
                onChange={(e)=>{setQuery(e.target.value)}}
                className={`search-input ${query && "input-active"} ${
                    !query && !darkMode && "input-light"
                  }`}
            />
        {query.trim() !== "" && (
          <div className="search-results-container">
            {searchResults.map((movie) => {
              return (
                <SearchItem
                  setQuery={setQuery}
                  key={movie.id}
                  movie={movie}
                />
              );
            })}
          </div>
        )}
      </div>
        <div className="header-buttons-container">
            <div className="theme-buttons-container">
                <div className="theme-buttons">
                    <MdOutlineLightMode className={`theme-icon ${!darkMode && 'theme-icon-active'}`}
                    onClick={() => {
                        setDarkMode(false)
                        localStorage.setItem("darkMode", false);
                    }} />
                    <MdOutlineDarkMode className={`theme-icon ${darkMode && 'theme-icon-active'}`}
                    onClick={() => {
                        setDarkMode(true);
                        localStorage.setItem("darkMode", true);
                    }} />
                </div>
            </div>
            <div>
              {token ? 
              <div className={`profile-container ${!darkMode && 'profile-light'}`}>
         
                <img 
                  src={user?.image_url} 
                  alt="avatar" 
                  className="profile-img" 
                  onClick={() => setShowProfile(prevState=>!prevState)}
                />
                <p>Welcome, {user?.username}</p>
                {showProfile && (
                  <div className = "profile-options">
                  <Link to={"/favorites"}>My Favorites</Link>
                  <p className="logout" onClick={handleLogout}>Logout</p>
              </div>
              )} 
              </div>
              :
               <Link to="/signup" className="create-account">Create an account</Link>}
              
              
              
            
          </div>
      </div>
    </div>
  )
}


export default Header