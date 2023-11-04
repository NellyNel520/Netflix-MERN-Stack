import React,  { useState, useRef } from 'react'
import './signup.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from '../../utils/firebase'
import { registerUser } from '../../context/apiCalls';

const Signup = () => {
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

  const handleFinish = async (e) => {
    e.preventDefault()
		setUsername(usernameRef.current.value);
		setPassword(passwordRef.current.value)
    try {
			await createUserWithEmailAndPassword(firebaseAuth, email, password);
			await registerUser({
				username,
				email
			});
		} catch (error) {
      console.log(error)
		}
	}

 


  return (
    <div className="signUp">
    <div className="top">
      <div className="wrapper">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt="logo"
        />
        <Link to='/login'>
          <button className="loginButton">Login</button>
        </Link>
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
          <input type="email" placeholder="Email" ref={emailRef} />
          <button className="signupButton" onClick={handleStart}>
            Get Started
          </button>
        </div>
      ) : (
        <form className="input">
        <input type="username" placeholder="username" ref={usernameRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <button className="signupButton" onClick={handleFinish}>
            Start
          </button>
        </form>
      )}
    </div>
  </div>
  )
}

export default Signup