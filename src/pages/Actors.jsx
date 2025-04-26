import React, { useEffect, useState } from "react"; 
import NavBar from "../components/NavBar";        

function Actors() {
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/actors') 
      .then(res => {
        if (!res.ok) { throw new Error("Network response was not ok"); }
        return res.json();
      })
      .then(data => {
        setActors(data);
        setError(null);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to load actors.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <header>
        <NavBar /> 
      </header>
      <main>
        <h1>Actors Page</h1>

        {isLoading && <p>Loading actors...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isLoading && !error && (
          <div>
            {actors.length > 0 ? (
              actors.map(actor => (
                <article key={actor.id} style={{ borderBottom: '1px solid #eee', marginBottom: '1rem', paddingBottom: '1rem' }}>
                  <h2>{actor.name || 'Unnamed Actor'}</h2>
                  {Array.isArray(actor.movies) && actor.movies.length > 0 ? (
                    <>
                      <strong>Movies:</strong>
                      <ul>
                        {actor.movies.map((movieTitle, index) => (
                          <li key={index}>{movieTitle}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p>No movies listed for this actor.</p>
                  )}
                </article>
              ))
            ) : (
               <p>No actors found.</p>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Actors;