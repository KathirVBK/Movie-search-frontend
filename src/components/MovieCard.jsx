import "../css/MovieCard.css"
import { useMovieContext } from '../contexts/MovieContext'

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(movie.id)

    function OnFavouriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null
    const year = movie.release_date?.split("-")[0]
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : `https://via.placeholder.com/500x750/1a1a2e/a0a0b8?text=No+Image`

    return (
        <div className='movie-card'>
            <div className='movie-poster'>
                <img src={posterUrl} alt={movie.title} loading="lazy" />

                {/* Rating Badge */}
                {rating && (
                    <div className="rating-badge">
                        ⭐ {rating}
                    </div>
                )}

                {/* Overlay */}
                <div className='movie-overlay'>
                    <p className="overlay-title">{movie.title}</p>
                    {year && <p className="overlay-year">{year}</p>}
                </div>

                {/* Favourite Button */}
                <button
                    className={`favorite-btn ${favorite ? "active" : ""}`}
                    onClick={OnFavouriteClick}
                    aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
                    title={favorite ? "Remove from favourites" : "Add to favourites"}
                >
                    {favorite ? "♥" : "♡"}
                </button>
            </div>

            <div className='movie-info'>
                <h3 title={movie.title}>{movie.title}</h3>
                {year && <p className="movie-year">{year}</p>}
            </div>
        </div>
    )
}

export default MovieCard