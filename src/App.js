import { useState,useEffect} from "react";
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
import './APP.css'

const tmdbApiKey = process.env.REACT_APP_API_KEY;
const API_URL = `https://www.omdbapi.com?apikey=${tmdbApiKey}`
// console.log(tmdbApiKey);
// const API_URL = `http://www.omdbapi.com?apikey=8362eec8`

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("one piece");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };



  return (
    <div className="app">
      <div ClassName = "head">
    <h1>MovieLand</h1>

    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies"
      />
      <img
        src={SearchIcon}
        alt="search"
        onClick={() => searchMovies(searchTerm)}
      />
    </div>
    </div>
    {movies?.length > 0 ? (
      <div className="container">
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    ) : (
      <div className="empty">
        <h2>No movies found</h2>
      </div>
    )}
  </div>
);
};

export default App;
