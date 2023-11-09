import './listItem.scss'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { removeMovieFromLiked } from '../../store'
// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { MONGO_DB_BASE_URL } from '../../utils/constants'

export default React.memo(function ListItem({ index, movie, type }) {
	const [isHovered, setIsHovered] = useState(false)
	const [runtime, setRuntime] = useState('')
	const [releaseDates, setReleaseDates] = useState([])
	const [videoId, setVideoId] = useState('')
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const navigate = useNavigate()
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email

	const dispatch = useDispatch()
	const savedList = useSelector((state) => state.netflix.savedList)
	const [isSaved, setIsSaved] = useState(false)
	// console.log(savedList)

	useEffect(() => {
		const getRunTime = () => {
			axios
				.get(
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
		const isItemSaved = () => {
			try {
				let saved = savedList.find((o) => o.id === movie.id)
				if (saved) {
					// setIsLiked(true)
					setIsSaved(true)
				}
			} catch (error) {
				console.log(error)
			}
		}

		getRunTime()
		getMovieTrailer()
		isItemSaved()
	}, [movie, savedList, type])

	// console.log(isSaved)

	// console.log(genreNames)

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
				.post(`${MONGO_DB_BASE_URL}/user/add`, {
					email,
					data: movie,
				})
				.then(() => setIsSaved(true))
		} catch (error) {
			console.log(error)
		}
	}

	const removeFromList = async () => {
		try {
			await dispatch(removeMovieFromLiked({ movieId: movie.id, email })).then(
				() => setIsSaved(false)
			)
		} catch (error) {
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
				<img src={`${BASE_URL}/${movie.image}`} alt="movie cover" />
			) : null}

			{isHovered && (
				<div>
					{videoId ? (
						<YouTube
							videoId={videoId}
							opts={{
								height: '140px',
								width: '325px',
								playerVars: { autoplay: 1, mute: 1 },
							}}
						/>
					) : (
						<img
							src={`${BASE_URL}/${movie.image}`}
							alt="movie cover"
							onClick={() =>
								navigate('/watch', {
									state: { videoId: videoId, movie: movie },
								})
							}
						/>
					)}
					<div className="itemInfo">
						<p>{movie.name}</p>

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

								{isSaved ? (
									<CheckIcon
										className="icon"
										title="Already saved"
										onClick={removeFromList}
									/>
								) : (
									<AddIcon
										className="icon"
										title="Add to my list"
										onClick={addToList}
									/>
								)}

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

							<span className="time">
								{runtime > 60 ? `${hours}h ${mins}m` : `${runtime}m`}
							</span>

							<span className="limit">4K</span>
						</div>

						<div className="genre">
							{movie.genres.map((name) => (
								<span className="test">{name}</span>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
})
