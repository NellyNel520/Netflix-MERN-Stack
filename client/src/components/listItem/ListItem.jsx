import React, { useState, useEffect } from 'react'
import './listItem.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import axios from 'axios'
import { API_KEY, TMDB_BASE_URL } from '../../utils/constants'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { removeMovieFromLiked } from '../../store'

export default React.memo(function ListItem({ index, movie, genres, type, }) {
	const [isHovered, setIsHovered] = useState(false)
	const [isLiked, setIsLiked] = useState(false)
	const [runtime, setRuntime] = useState('')
	const [releaseDates, setReleaseDates] = useState([])
	const [videoId, setVideoId] = useState('')
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const navigate = useNavigate()
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	const usersList = useSelector((state) => state.netflix.usersList)

	// console.log(usersList)
	const dispatch = useDispatch() 

	// console.log(usersSavedList)

	useEffect(() => {
		const getRunTime = () => {
			
			axios
				.get(
					// `${TMDB_BASE_URL}/${type}/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates`
					`https://api.themoviedb.org/3/${type}/${movie.id}?api_key=1b3318f6cac22f830b1d690422391493&language=en-US&append_to_response=release_dates`
				)
				.then((response) => {
					// console.log(response.data.release_dates.results)
					setRuntime(response.data.runtime)
					setReleaseDates(response.data.release_dates.results)
				})
				.catch((error) => {
					console.log(error)
				})
		}

		const getMovieTrailer = async () => {
			// await movieTrailer(null, {
			// 	id: true,
			// 	apiKey: '1b3318f6cac22f830b1d690422391493',
			// 	tmdbId: movie.id,
			// })
			await movieTrailer(movie.name, {
				id: true,
				multi: true,
			})
				.then((response) =>
					// console.log(response, 'herrrreeeee')
					setVideoId(response[1])
				)
				.catch((err) => console.log(err))
		}


		getRunTime()
		getMovieTrailer()

	}, [movie, type,])

	// console.log(genreNames)

	// const releaseDate = new Date(movie.release_date)
	// const releaseYear = releaseDate.getFullYear()
	const hours = Math.floor(runtime / 60)
	const mins = runtime % 60

	const UsRating = releaseDates.filter(function (item) {
		return item.iso_3166_1 === 'US'
	})
	const rating = UsRating[0]?.release_dates[0]?.certification
	// console.log(rating)

	const addToList = async () => {
		try {
			await axios
				.post('http://localhost:3001/api/user/add', {
					email,
					data: movie,
				})
				.then(() => setIsLiked(true))
		} catch (error) {
			console.log(error)
		}
	}
	// onClick={() =>
	// 	dispatch(
	// 		removeMovieFromLiked({ movieId: movieData.id, email })
	// 	)
	// }

	const removeFromList = async () => {
		try {
			await dispatch(removeMovieFromLiked({movieId: movie.id, email}))
			.then(() => setIsLiked(false))
		} catch (error){
			console.log(error)
		}
	}

	return (
		<div
			className="listItem"
			style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{!isHovered ? (
				<img
					// src={
					// 	'https://vidasalseracom.files.wordpress.com/2021/08/vivo-2-vidasalsera.jpg?w=1200'
					// }
					src={`${BASE_URL}/${movie.image}`}
					alt="movie cover"
				/>
			) : null}
			{/* <img src={`${BASE_URL}/${movie.backdrop_path}`} alt="movie cover" /> */}

			{isHovered && (
				<>
					{videoId ? (
						<YouTube
							videoId={videoId}
							opts={{
								// height: '200px',
								// width: '438px',
								height: '140px',
								width: '325px',
								playerVars: { autoplay: 1, mute: 1 },
							}}
						/>
					) : (
						<img src={`${BASE_URL}/${movie.image}`} alt="movie cover" />
					)}
					<div className="itemInfo">
						<p>{movie.name}</p>
						{/* <p>{movie.image}</p> */}
						<div className="icons">
							<div>
								<PlayArrowIcon
									className="icon"
									onClick={() =>
										navigate('/watch', {
											state: { videoId: videoId, movie: movie },
										})
									}
								/>

								{/* ******************* on click add to my list mongo db *****************/}

								{isLiked ? (
									<CheckIcon className="icon" title="Already saved" onClick={removeFromList}/>
								) : (
									<AddIcon
										className="icon"
										title="Add to my list"
										onClick={addToList}
									/>
								)}
								{/* <AddIcon
										className="icon"
										title="Add to my list"
										onClick={addToList}
									/> */}

								<ThumbUpAltOutlinedIcon className="icon" />
							</div>
							<KeyboardArrowDownOutlinedIcon className="infoIcon" />
						</div>

						<div className="itemInfoTop">
							{rating ? (
								<span className="limit">{rating}</span>
							) : (
								<span className="limit">NR</span>
							)}
							{/* <span className="limit">NR</span> */}

							{/* 	{showDetails.number_of_seasons > 1 ? `${showDetails.number_of_seasons} Seasons` : `${showDetails.number_of_episodes} Episodes`}  */}
							{/* {type === 'tv' ? () :} */}
							<span className="time">
								{runtime > 60 ? `${hours}h ${mins}m` : `${runtime}m`}
							</span>
							{/* <span className="time">1h 20m</span> */}
							<span className="limit">4K</span>
						</div>

						{/* <div className="desc">
            {movie.overview.length > 150 ?
            `${movie.overview.substring(0, 150)}...` : movie.overview
            }
          </div> */}

						<div className="genre">
							{movie.genres.map((name) => (
								<span className="test">{name}</span>
							))}
							{/* <span className="test">Comedy</span> */}
						</div>
					</div>
				</>
			)}
		</div>
	)
})
