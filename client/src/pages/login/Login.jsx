import './login.scss'
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../utils/firebase'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
// error alert message
// import Alert from '@mui/material/Alert'
// or use custom alert component errorAlert

// alert imports
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse'

const loginFormSchema = Yup.object().shape({
	email: Yup.string()
		.email()
		.required('An email, username, or phone number is required'),
	password: Yup.string()
		.required()
		.min(6, 'Your password has to have at least 6 characters '),
})

const Login = () => {
	// const [email, setEmail] = useState('')
	// const [password, setPassword] = useState('')
	const [isError, setIsError] = useState(false)
	// const [errorMessage, setErrorMessage] = useState()

	// const emailRef = useRef()
	// const passwordRef = useRef()

	const handleLogin = async (email, password) => {
		try {
			await signInWithEmailAndPassword(firebaseAuth, email, password)
		} catch (error) {
			console.log(error.code)
			setIsError(true)
		}
	}

	return (
		<div className="login2">
			<div className="top">
				<div className="wrapper">
					<img
						className="logo"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt="logo"
					/>
				</div>
			</div>

			<div className="container">
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={(values) => {
						handleLogin(values.email, values.password)
						// console.log(values.email, values.password, values.username)
					}}
					validationSchema={loginFormSchema}
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
							<div className="formCont">
								<h1>Sign In</h1>
								<input
									type="email"
									placeholder="Email or phone number"
									onChange={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
									className={`input ${
										values.email.length < 1 || Validator.validate(values.email)
											? 'valid'
											: 'invalid'
									}`}
								/>
								<input
									type="password"
									placeholder="Password"
									onChange={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									className={`input ${
										values.password.length < 1 || values.password.length > 5
											? 'valid'
											: 'invalid'
									}`}
								/>

								<button
									className={`loginButton ${!isValid && 'invalid'}`}
									onClick={handleSubmit}
									disabled={!isValid}
								>
									Sign In
								</button>

								<div className="save">
									<div className="checkbox">
										<input
											type="checkbox"
											id="checkbox"
											// checked={isChecked}
										/>
										<label htmlFor="checkbox">Remember me ?</label>
									</div>

									<div className="help">Need help?</div>
								</div>

								<div className="signupLink">
									New to Netflix?{' '}
									<Link to={'/signup'}>
										<b>Sign up now</b>
									</Link>
								</div>

								<small>
									This page is protected by Google reCAPTCHA to ensure you're
									not a bot. <b>Learn more</b>.
								</small>
							</div>

							{isError && (
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
									Invalid email address and / or password!
								</Alert>
							)}
						</>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default Login
