import React, { useState, useRef } from 'react'
import './signup.scss'
import { useNavigate, Link } from 'react-router-dom'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth'
import { firebaseAuth } from '../../utils/firebase'
import { registerUser } from '../../context/apiCalls'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'

import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const signupFormSchema = Yup.object().shape({
	email: Yup.string().email().required('An email is required'),
	username: Yup.string().required().min(1, 'A username is required'),
	password: Yup.string()
		.required()
		.min(6, 'Your password has to have at least 8 characters '),
})

const Signup2 = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	let navigate = useNavigate()

	// states for error alert messages
	// const [emailError, setEmailError] = useState(false)
	// const [passwordError, setPasswordError] = useState(false)
	// const [usernameError, setUsernameError] = useState(false)

	const emailRef = useRef()
	const passwordRef = useRef()
	const usernameRef = useRef()

	const handleStart = () => {


		setEmail(emailRef.current.value)
	
	}

	const handleFinish = async (email, password, username) => {
		// setUsername(usernameRef.current.value)
		// setPassword(passwordRef.current.value)
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
						alt="logo"
					/>
					<Link to="/login">
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
				<Formik
					initialValues={{ email: '', password: '', username: '' }}
					onSubmit={(values) => {
						handleFinish(values.email, values.password, values.username)
						// console.log(values.email, values.password, values.username)
					}}
					validationSchema={signupFormSchema}
					validateOnMount={true}
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						errors,
						isValid,
					}) => (
						<>
							<div></div>
							{!email ? (
								<>
									<div
										className="input"
										// className={`input ${
										// 			values.email.length < 1 || Validator.validate(values.email)
										// 				? 'valid'
										// 				: 'invalid'
										// 		}`}
									>
										<input
											type="email"
											placeholder="Email"
											ref={emailRef}
											onChange={handleChange('email')}
											onBlur={handleBlur('email')}
											value={values.email}
											className={`textInput ${
												values.email.length < 1 ||
												Validator.validate(values.email)
													? 'valid'
													: 'invalid'
											}`}
										/>
										<button
											className="signupButton"
											// onClick={Validator.validate(values.email) ? setIsError(false) : setIsError(true)}
											// onClick={handleStart(Validator.validate(values.email))}
											onClick={handleStart}
											disabled={!Validator.validate(values.email)}
										>
											Get Started
										</button>

										{/* {emailError &&(
											<Alert
									severity="error"
									action={
										<IconButton
											aria-label="close"
											color="inherit"
											size="small"
											onClick={() => {
												setEmailError(false)
											}}
										>
											<CloseIcon fontSize="inherit" />
										</IconButton>
									}
									sx={{ mb: 2 }}
								>
									Invalid email address and / or password!
								</Alert>
										)} */}
									</div>
								</>
							) : (
								<>
									<div className="input">
										<input
											type="username"
											placeholder="username"
											ref={usernameRef}
											onChange={handleChange('username')}
											onBlur={handleBlur('username')}
											value={values.username}
											className={`textInput ${
												values.username.length > 0 ? 'valid' : 'invalid'
											}`}
										/>

										<input
											type="password"
											placeholder="Password"
											ref={passwordRef}
											onChange={handleChange('password')}
											onBlur={handleBlur('password')}
											value={values.password}
											className={`textInput ${
												values.password.length > 5 ? 'valid' : 'invalid'
											}`}
										/>
										<button
											// className="signupButton"
											className={`signupButton ${!isValid && 'invalid'}`}
											onClick={handleSubmit}
											disabled={!isValid}
										>
											Start
										</button>
									</div>

									{/* {isError && (
										<Collapse in={isError}>
											<Alert
												severity="error"
												action={
													<IconButton
														aria-label="close"
														color="inherit"
														size="small"
														onClick={() => {
															setIsError(false)
														}}
													>
														<CloseIcon fontSize="inherit" />
													</IconButton>
												}
												sx={{ mb: 2 }}
											>
												Invalid email address !
											</Alert>
										</Collapse>
									)} */}
								</>
							)}

							{/* 	borderColor:
										values.email.length < 1 || Validator.validate(values.email)
											? '#ccc'
											: 'red', */}
						</>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default Signup2
