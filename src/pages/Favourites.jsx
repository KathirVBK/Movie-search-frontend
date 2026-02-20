import "../css/Favourites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"
import { Link } from "react-router-dom"

function Favourites() {
  const { favorites } = useMovieContext()

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <div className="favorites-header">
          <span className="header-icon">❤️</span>
          <h2>Your Favourites</h2>
          <p className="favorites-subtitle">{favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved</p>
        </div>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-empty">
      <span className="empty-icon">🎬</span>
      <h2>No Favourites Yet</h2>
      <p>Start exploring movies and hit the ♥ to save your favourites here.</p>
      <Link to="/" className="empty-cta">Browse Movies</Link>
    </div>
  )
}

export default Favourites