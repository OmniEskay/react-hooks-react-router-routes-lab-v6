import React, { useEffect, useState } from "react"; 
import NavBar from "../components/NavBar";        

function Directors() {
  const [directors, setDirectors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/directors') 
      .then(res => {
        if (!res.ok) { throw new Error("Network response was not ok"); }
        return res.json();
        })
      .then(data => {
        setDirectors(data);
        setError(null);
      })
      .catch(err => {
         console.error("Fetch error:", err);
         setError("Failed to load directors.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Directors Page</h1> 

        {isLoading && <p>Loading directors...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isLoading && !error && (
          <div>
            {directors.length > 0 ? (
              directors.map(director => (
                <article key={director.id} style={{ borderBottom: '1px solid #eee', marginBottom: '1rem', paddingBottom: '1rem' }}>
                  <h2>{director.name || 'Unnamed Director'}</h2>
                  {Array.isArray(director.movies) && director.movies.length > 0 ? (
                    <>
                      <strong>Movies:</strong>
                      <ul>
                        {director.movies.map((movieTitle, index) => (
                          <li key={index}>{movieTitle}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p>No movies listed for this director.</p>
                  )}
                </article>
              ))
            ) : (
              <p>No directors found.</p>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Directors;