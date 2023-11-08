import './signup.scss'
import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../utils/firebase'
import { registerUser } from '../../context/apiCalls'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'

const signupFormSchema = Yup.object().shape({
	email: Yup.string().email().required('An email is required'),
	username: Yup.string().required().min(1, 'A username is required'),
	password: Yup.string()
		.required()
		.min(6, 'Your password has to have at least 8 characters '),
})

const Signup2 = () => {
	const [email, setEmail] = useState('')
	let navigate = useNavigate()

	const emailRef = useRef()
	const passwordRef = useRef()
	const usernameRef = useRef()

	const handleStart = () => {
		setEmail(emailRef.current.value)
	}

	const handleFinish = async (email, password, username) => {
		try {
			await createUserWithEmailAndPassword(firebaseAuth, email, password)
			await registerUser({
				username,
				email,
			})
		} catch (error) {
			console.log(error)
			// Alert.alert('Opps ...', error.message)
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
									<div className="input">
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
											onClick={handleStart}
											disabled={!Validator.validate(values.email)}
										>
											Get Started
										</button>
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
											className={`signupButton ${!isValid && 'invalid'}`}
											onClick={handleSubmit}
											disabled={!isValid}
										>
											Start
										</button>
									</div>
								</>
							)}
						</>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default Signup2
