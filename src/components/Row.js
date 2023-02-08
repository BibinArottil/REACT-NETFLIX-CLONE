import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import Youtube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("")

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts={
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    }
  }
 
  const handleClick = (id) =>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=30d24e41464e55f6896132ebd8545532&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
        setTrailerUrl(response.data.results[0])
      }else{
        console.log('no trailer found')
      }
    })
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie.id)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl.key} opts={opts} />}
    </div>
  );
};

export default Row;
