import React, {useEffect, useState} from 'react'
import './Genres.css'
import axios from 'axios'

function Genres({movieGenres, apiKey, baseUrl, component}) {
    //console.log("MovieGenres" + movieGenres)

    //console.log(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)

    const [allGenres, setAllGenres] = useState([]);

    useEffect(()=>{
        const fetchGenres = async() => {
            try{
                const res = await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
                setAllGenres(res.data.genres)
            }
            catch(err){
                console.log(err);
            }
        };
        fetchGenres();
    }, [])

  return (
    <div style={{display:"flex"}}>
        <p>Genres:&nbsp;</p>
        {movieGenres?.map((id, index) => {
            const genre = allGenres.find(genre => genre.id === id)
            return(
                <p key={index}>{genre?.name}
                {index !== movieGenres.length-1 && ","}&nbsp;</p>
            )
        })}
    </div>
  )
}

export default Genres