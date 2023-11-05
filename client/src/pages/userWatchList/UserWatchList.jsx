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
	const movies = useSelector((state) => state.netflix.movies)
	const users = useSelector((state) => state.netflix.users)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch])

  // console.log(users)

	// const getUserByEmail = (currentUser) => {
	// 	try {
	// 		const user = users.filter(function (item) {
	// 			// Applying filter for the inserted text in search bar
	// 			const itemData = item.email
	// 			const userEmail = currentUser.email

	// 			return itemData.indexOf(userEmail) > -1
	// 		})
    // set User info
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }


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
