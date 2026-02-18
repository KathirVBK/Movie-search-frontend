import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import MovieCard from './comoponents/MovieCard'
import Home from './pages/Home'
import NavBar from './comoponents/NavBar'
import { Routes, Route } from 'react-router-dom'
import Favourites from './pages/Favourites'
import { MovieProvider } from './contexts/MovieContext'

function App() {
  return (
    <>
    <div>
      <MovieProvider>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </main>
      </MovieProvider>
      </div>
    </>
  )
}

export default App
