import React from 'react'
import './app.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Watch from './pages/watch/Watch'
import Movies from './pages/movies/Movies'
import Series from './pages/shows/Series'
import UserWatchList from './pages/userWatchList/UserWatchList'
import NewAndPopular from './pages/newAndPopular/NewAndPopular'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const App = () => { 
	// const currentUser = false
	const { currentUser } = useContext(AuthContext)

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					exact
					element={currentUser ? <Home /> : <Navigate to={'/signup'} />}
				/>
				<Route
					path="/signup"
					exact
					element={!currentUser ? <Signup /> : <Navigate to={'/'} />} 
				/>
				<Route
					path="/login"
					exact
					element={!currentUser ? <Login /> : <Navigate to={'/'} />}
				/>

				{currentUser && (
					<>
						<Route exact path="/watch" element={<Watch />} />
						<Route exact  path="/movies" element={<Movies />} />
						<Route exact path="/series" element={<Series />} />
						<Route exact path="/new" element={<NewAndPopular />} />
						<Route exact path="/myList" element={<UserWatchList />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	)
}

export default App
