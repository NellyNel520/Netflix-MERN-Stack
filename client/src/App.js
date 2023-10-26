import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login  />} />
      <Route exact path="/signup" element={<Signup  />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
