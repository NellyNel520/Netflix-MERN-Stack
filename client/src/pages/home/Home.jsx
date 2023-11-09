import './home.scss'
import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import HomeLists from '../../components/listContainer/HomeLists'
// import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
	fetchMovies,
	getGenres,
	fetchShows,
	getAllUsers,
	getSavedList,
} from '../../store'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Home = ({ type }) => {
	const movies = useSelector((state) => state.netflix.movies)
	const shows = useSelector((state) => state.netflix.shows)
	const genres = useSelector((state) => state.netflix.genres)
	const genresLoaded = useSelector((state) => state.netflix.genresLoaded)
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email

	const users = useSelector((state) => state.netflix.users)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getGenres())
		dispatch(getAllUsers())
	}, [])

	useEffect(() => {
		if (genresLoaded) {
			dispatch(fetchMovies({ genres, type: 'movie' }))
			dispatch(fetchShows({ genres, type: 'tv' }))

			dispatch(getSavedList({ users, email }))
		}
	}, [genresLoaded, genres, dispatch, users, email])

	return (
		<div className="home">
			<Navbar />
			<Featured type={type} genres={genres} itemList={movies} i={4} />\
			<div className="listContainer">
				<HomeLists movies={movies} shows={shows} />
			</div>
		</div>
	)
}

export default Home
