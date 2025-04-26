import React, { useEffect, useState } from "react";  
import { useParams } from 'react-router-dom';      
import NavBar from "../components/NavBar";      

function Movie() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://localhost:3001/movies/${id}`) 
        .then(res => {
          if (!res.ok) {
             if (res.status === 404) throw new Error("Movie not found.");
             throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then(data => {
          setMovie(data);
          setError(null);
        })
        .catch(err => {
           console.error("Fetch error:", err);
           setError(err.message || "Failed to load movie details."); 
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]); 

  const renderMovieDetails = () => {
     if (isLoading) return <p>Loading movie details...</p>;
     if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
     if (!movie) return <p>Movie not found or failed to load.</p>; 

     const genres = Array.isArray(movie.genres) ? movie.genres : [];

     return (
        <>
            <h1>{movie.title}</h1> 
            <p>Time: {movie.time || 'N/A'}</p> 
            <div> 
                <strong>Genres:</strong>
                {genres.length > 0 ? (
                    genres.map((genre, index) => (
                    <span
                        key={index}
                        style={{
                            display: 'inline-block',
                            border: '1px solid grey',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            margin: '0 5px 5px 0'
                        }}
                    >
                        {genre}
                    </span>
                    ))
                ) : (
                    <span> No genres listed.</span> 
                )}
            </div>
        </>
     )
  }

  return (
    <>
      <header>
         <NavBar /> 
      </header>
      <main>
         {renderMovieDetails()}
      </main>
    </>
  );
};

export default Movie;