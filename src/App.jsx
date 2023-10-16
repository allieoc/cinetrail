import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContextReducer from './contexts'
import Slider from './components/Slider/Slider'
import Homepage from './pages/Homepage/Homepage'
import MovieDetails from './pages/MovieDetails/MovieDetails'
import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin'
import Favorites from './pages/Favorites/Favorites'

function App() {

  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
   
      <BrowserRouter>
       <ContextReducer>
        <Header />
        <Routes>
          <Route path="/"
          element={<Homepage apiKey={apiKey} baseUrl={baseUrl} />}
          />
          <Route path={"/movieDetails/:movieId"} element={<MovieDetails />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/favorites"} element={<Favorites />} />
        </Routes>
        </ContextReducer>
      </BrowserRouter>
    
  )
}

export default App
