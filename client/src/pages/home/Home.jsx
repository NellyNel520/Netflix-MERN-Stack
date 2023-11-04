import React, { useEffect } from 'react' 
import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import HomeLists from '../../components/listContainer/HomeLists'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getGenres, fetchShows, getUsersLikedMovies } from '../../store'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Home = ({type}) => {
	const movies = useSelector((state) => state.netflix.movies)
	const shows = useSelector((state) => state.netflix.shows)
	const genres = useSelector((state) => state.netflix.genres)
	const genresLoaded = useSelector((state) => state.netflix.genresLoaded)
	const { currentUser } = useContext(AuthContext)
	// const usersList = useSelector((state) => state.netflix.usersList)


// console.log(currentUser)

	const navigate = useNavigate()
	const dispatch = useDispatch()  

	useEffect(() => { 
		dispatch(getGenres())   
	}, [dispatch]) 

	useEffect(() => {
		if (genresLoaded) {
			dispatch(fetchMovies({ genres, type: 'movie' }))
			dispatch(fetchShows({ genres, type: 'tv' }))
			dispatch(getUsersLikedMovies({ email: currentUser.email }))
		}
	}, [genresLoaded, currentUser, genres, dispatch])

	// console.log(movies)
	// console.log(genres)
	// console.log(shows)
	// console.log(usersList)
	return (
		<div className="home">
			<Navbar />
			<Featured type={type} genres={genres} itemList={movies} i={4}/>
			{/* 
      <List />
      <List />
      <List />
      <List /> */}

			<div className="listContainer">
				<HomeLists movies={movies} shows={shows}/>
			</div>
		</div>
	)
}

export default Home
