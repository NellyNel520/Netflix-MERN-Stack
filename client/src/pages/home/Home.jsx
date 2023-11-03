import React, { useEffect } from 'react'
import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import HomeLists from '../../components/list/HomeLists'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getGenres, fetchShows } from '../../store'

const Home = () => {
	const movies = useSelector((state) => state.netflix.movies)
	const shows = useSelector((state) => state.netflix.shows)
	const genres = useSelector((state) => state.netflix.genres)
	const genresLoaded = useSelector((state) => state.netflix.genresLoaded)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getGenres())
	}, [])

	useEffect(() => {
		if (genresLoaded) {
			dispatch(fetchMovies({ genres, type: 'movie' }))
			dispatch(fetchShows({ genres, type: 'tv' }))
		}
	}, [genresLoaded])

	// console.log(movies)
	// console.log(genres)
	// console.log(shows)
	return (
		<div className="home">
			<Navbar />
			<Featured />
			{/* 
      <List />
      <List />
      <List />
      <List /> */}

			<div className="listContainer">
				<HomeLists movies={movies} shows={shows} />
			</div>
		</div>
	)
}

export default Home
