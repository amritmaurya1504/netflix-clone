import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'

const base_link = "https://image.tmdb.org/t/p/original/";
//  "https://www.youtube.com/watch?";

const Row = ({ title, fetchUrl, isLargeRow }) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        //Fetch Movies from TMDB by different URL
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            // console.table(request);
            return request;
        }
        fetchData();
    }, [fetchUrl])
    const opts ={
        height: "390",
        width : "100%",
        playerVars : {
             // https://developers.google.com/youtube/player_parameters
          autoplay :1,
        },
    }
    const trailerFun =(currElem)=>{
       if(trailerUrl){
           setTrailerUrl('')
       }else{
           movieTrailer(currElem?.name || "")
           .then(url =>{
               const urlParams = new URLSearchParams(new URL(url).search);
               setTrailerUrl(urlParams.get("v"))

           }).catch((error)=>{
               console.log(error);
           })
       }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_images">
                {
                    movies.map((currElem) => {
                        return <img
                            key={currElem.id}
                            onClick = {trailerFun(currElem)}
                            className={`img_div ${isLargeRow && "img_largediv"}`}
                            src={`${base_link}${isLargeRow ? currElem.poster_path : currElem.backdrop_path}`} alt={currElem.name} />
                    })
                }
            </div>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
