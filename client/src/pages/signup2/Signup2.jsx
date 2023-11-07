
import React, { useState, useRef } from 'react'
import './signup2.scss'
import { useNavigate, Link } from 'react-router-dom'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth'
import { firebaseAuth } from '../../utils/firebase'
import { registerUser } from '../../context/apiCalls'

// form validation
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'



const Signup2 = () => {
  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	let navigate = useNavigate()

  const emailRef = useRef()
	const passwordRef = useRef()
	const usernameRef = useRef()

  const handleStart = () => {
		

		setEmail(emailRef.current.value)
	
	}

	const handleFinish = async (email, password, username) => {
		setUsername(usernameRef.current.value)
		setPassword(passwordRef.current.value)
		try {
			// if() 
			await createUserWithEmailAndPassword(firebaseAuth, email, password)
			await registerUser({
				username,
				email,
			})
			// console.log('🔥 Firebase Signup Successful ✅', email, password)
			// console.log('🔥 MongoDB Signup Successful ✅', email, username)
		} catch (error) {
			console.log(error)
			// Alert.alert('Opps ...', error.message)
			// set error state true
			// set message state to error.message
		}
	}

  return (
    <div className="signUp">
    <div className="top">
      <div className="wrapper">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />
        <button className="loginButton">Sign In</button>
      </div>
    </div>
    <div className="container">
      <h1>Unlimited movies, TV shows, and more.</h1>
      <h2>Watch anywhere. Cancel anytime.</h2>
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      {!email ? (
        <div className="input">
          <input className="textInput" type="email" placeholder="email address" ref={emailRef} />
          <button className="signupButton" onClick={handleStart}>
            Get Started
          </button>
        </div>
      ) : (
        <form className="input">
          <input className="textInput" type="username" placeholder="username" ref={usernameRef} />
          <input className="textInput" type="password" placeholder="password" ref={passwordRef} />
          <button className="signupButton" onClick={handleFinish}>
            Start
          </button>
        </form>
      )}
    </div>
  </div>
  )
}

export default Signup2