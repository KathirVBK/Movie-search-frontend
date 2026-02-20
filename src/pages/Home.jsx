import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import "../css/Home.css"
import { searchMovies, getPopularMovies } from '../services/api'

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hasSearched, setHasSearched] = useState(false)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies. Please try again.")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading(true)
        setHasSearched(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='home'>
            {/* Hero + Search */}
            <div className="home-hero">
                <h1>
                    Discover Your Next<br />
                    <span className="hero-accent">Favourite Film</span>
                </h1>
                <p>Search millions of movies, save your favourites.</p>

                <form onSubmit={handleSearch} className='search-form'>
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type='text'
                            placeholder='Search for movies...'
                            className='search-input'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='search-button'>
                        Search
                    </button>
                </form>
            </div>

            {/* Error */}
            {error && (
                <div className='error-message'>
                    ⚠️ {error}
                </div>
            )}

            {/* Content */}
            {loading ? (
                <div className='loading'>
                    <div className="spinner" />
                    <span>Loading movies...</span>
                </div>
            ) : (
                <>
                    <div className="section-divider">
                        <div className="divider-line" />
                        <span>{hasSearched ? `Results for "${searchQuery}"` : "🔥 Popular Right Now"}</span>
                        <div className="divider-line" />
                    </div>

                    <div className='movies-grid'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Home