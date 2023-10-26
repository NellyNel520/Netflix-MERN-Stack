import React from 'react'
import './app.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Watch from './pages/watch/Watch'
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
					<Route path="/watch" element={<Watch />} /> 
						{/* <Route path="/movies" element={<Home type="movies" />} />
					<Route path="/series" element={<Home type="series" />} />*/}
					</>
				)}
			</Routes>
		</BrowserRouter>
	)
}

export default App
