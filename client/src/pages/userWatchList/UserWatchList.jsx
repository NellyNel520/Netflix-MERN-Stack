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
import Card from '../../components/card/Card'
import Show from '../../components/listItem/Show'

const UserWatchList = () => {
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	const users = useSelector((state) => state.netflix.users)
	// will add these states to redux toolkit once functional
	const [movieList, setMovieList] = useState([])
	const [userId, setUserId] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch])

	// console.log(users)

	// useEffect(() => {
	// 	const getUserMovieList = () => {
	// 		const user = users.find((o) => o.email === email)
	// 		setUserId(user._id)
	// 	}

	// 	getUserMovieList()
	// }, [email, users])

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				let user = users.find((o) => o.email === email)
				let id = user._id
				await axios
					.get(`http://localhost:3001/api/user/${id}`)
					.then((response) => {
						// console.log(response.data.user.likedMovies)
						setMovieList(response.data.user.likedMovies)
					})
			} catch (error) {
				console.log(error)
			}
		}

		getUserInfo()
	}, [email, users])

	// console.log(movieList)

	return (
		<div className="container">
			<Navbar />

			<div className="content">
				<div className="title">
					<span>My List</span>
				</div>
				<div className="grid-cont">
					<div className="grid">
						{movieList.map((movie, i) => {
							return <Card index={i} movie={movie} key={movie.id} />
						})}
					</div>
				</div>
			</div>
		</div> 
	)
}

export default UserWatchList
