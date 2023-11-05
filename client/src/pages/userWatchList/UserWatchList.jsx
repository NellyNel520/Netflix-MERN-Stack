import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../../store'
import './userWatchList.scss'
import Navbar from '../../components/navbar/Navbar'

const UserWatchList = () => {
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	const users = useSelector((state) => state.netflix.users)
	// will add these states to redux toolkit once functional
	const [movieList, setMovieList] = useState([])

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch])

	// console.log(users)

	useEffect(() => {
		const getUserMovieList = () => {
			const user = users.find((o) => o.email === email)
			setMovieList(user.likedMovies)
		}

		getUserMovieList()
	}, [email, users])

	console.log(movieList)


	return (
		<div className="container">
			<Navbar />
			<div className="title">
				<span>My List</span>
			</div>
		</div>
	)
}

export default UserWatchList
