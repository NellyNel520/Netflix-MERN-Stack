import React, { useState, useEffect } from 'react'
import './trendingItem.scss'
import axios from 'axios'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { removeMovieFromLiked } from '../../store'
// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import CheckIcon from '@mui/icons-material/Check'

export default React.memo(function TrendingItem({ index, item }) {
	const [isHovered, setIsHovered] = useState(false)
	const [isLiked, setIsLiked] = useState(false)
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const [videoId, setVideoId] = useState('')
	const [releaseDates, setReleaseDates] = useState([])
	const [runtime, setRuntime] = useState('')
	const navigate = useNavigate()
	const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
	const dispatch = useDispatch()
	const savedList = useSelector((state) => state.netflix.savedList)
	const [isSaved, setIsSaved] = useState(false)
 
	useEffect(() => {
		const getRunTime = () => {
			axios
				.get(
					// `${TMDB_BASE_URL}/${type}/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates`
					`https://api.themoviedb.org/3/movie/${item.id}?api_key=1b3318f6cac22f830b1d690422391493&language=en-US&append_to_response=release_dates`
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
			await movieTrailer(item.name, {
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
				let saved = savedList.find((o) => o.id === item.id)
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
	}, [item, savedList ])

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
					data: item,
				})
				.then(() => setIsSaved(true))
		} catch (error) {
			console.log(error)
		}
	}

	const removeFromList = async () => {
		try {
			await dispatch(removeMovieFromLiked({ movieId: item.id, email })).then(
				() => setIsSaved(false)
			)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div
			className="trendingListItem"
			style={{ left: isHovered && index * 385 - 50 + index * 2.5 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{!isHovered ? (
				<div className="list-position">
					<div className="orderNumber">{index + 1}</div>
					<img
						className="poster"
						src={`${BASE_URL}/${item.poster}`}
						alt="movie cover"
					/>
				</div>
			) : null}
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
						<img
							// src={
							// 	'https://vidasalseracom.files.wordpress.com/2021/08/vivo-2-vidasalsera.jpg?w=1200'
							// }
							src={`${BASE_URL}/${item.image}`}
							alt="movie cover"
						/>
					)}

					<div className="itemInfo">
						<p>{item.name}</p>
						<div className="icons">
							<div>
								<PlayArrowIcon
									className="icon"
									onClick={() =>
										navigate('/watch', {
											state: { videoId: videoId, movie: item },
										})
									}
								/>

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
							{/* <span className="limit">NR</span> */}

							<span className="time">
								{runtime > 60 ? `${hours}h ${mins}m` : `${runtime}m`}
							</span>
							<span className="limit">HD</span>
						</div>

						<div className="genre">
							{item.genres.map((name) => (
								<span className="test">{name}</span>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
})
