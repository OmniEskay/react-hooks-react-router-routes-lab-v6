import React, { useEffect, useState } from "react"; 
import NavBar from "../components/NavBar";         r
import MovieCard from "../components/MovieCard";    

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true); 
    fetch('http://localhost:3001/movies') 
      .then(res => {
        if (!res.ok) { throw new Error("Network response was not ok"); }
        return res.json();
      })
      .then(data => {
        setMovies(data);
        setError(null); 
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to load movies."); 
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []); 

  return (
    <>
      <header>
         <NavBar /> 
      </header>
      <main>
         <h1>Home Page</h1> 

         {isLoading && <p>Loading movies...</p>}
         {error && <p style={{ color: 'red' }}>{error}</p>}
         {!isLoading && !error && (
            <div className="movie-list"> 
                {movies.length > 0 ? (
                    movies.map(movie => (
                       <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>No movies found.</p> 
                )}
           </div>
         )}
      </main>
    </>
  );
};

export default Home;