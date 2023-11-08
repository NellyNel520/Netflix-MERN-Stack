import './app.scss'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Watch from './pages/watch/Watch'
import Movies from './pages/movies/Movies'
import Series from './pages/shows/Series'
import UserWatchList from './pages/userWatchList/UserWatchList'
import NewAndPopular from './pages/newAndPopular/NewAndPopular'
import Search from './pages/search/Search'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const App = () => { 
	const { currentUser } = useContext(AuthContext)

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					exact
					element={currentUser ? <Home  /> : <Navigate to={'/signup'} />}
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
						<Route exact path="/watch" element={currentUser ? <Watch /> : <Navigate to={'/'} />} />
						<Route exact  path="/movies" element={currentUser ? <Movies /> : <Navigate to={'/'} />} />
						<Route exact path="/series" element={currentUser ? <Series /> : <Navigate to={'/'} />}/>
						<Route exact path="/new" element={currentUser ? <NewAndPopular /> : <Navigate to={'/'} />}/>
						<Route exact path="/myList" element={currentUser ? <UserWatchList /> : <Navigate to={'/'} />}/>
						<Route exact path="/search" element={currentUser ? <Search /> : <Navigate to={'/'} />}/>
					</>
				)}
			</Routes>
		</BrowserRouter>
	)
}

export default App
