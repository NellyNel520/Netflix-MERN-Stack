import React, { useState, useEffect } from 'react'
import './listItem.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import axios from 'axios'
import { API_KEY, TMDB_BASE_URL } from '../../utils/constants'

export default React.memo(function Show({ index, movie, genres, type }) {
	const [isHovered, setIsHovered] = useState(false)
	const [showDetails, setShowDetails] = useState({})
	const [releaseDates, setReleaseDates] = useState([])
	const [videoId, setVideoId] = useState('')
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const navigate = useNavigate()

	useEffect(() => {
		const getSeriesDetails = () => {
			axios
				.get(
					`	https://api.themoviedb.org/3/tv/${movie.id}?api_key=1b3318f6cac22f830b1d690422391493&language=en-US&append_to_response=release_dates
      `
				)
				.then((response) => {
					// console.log(response.data)
					setShowDetails(response.data)
					// setRuntime(response.data.runtime)
					// setReleaseDates(response.data.release_dates.results)
				})
				.catch((error) => {
					console.log(error)
				})
		}

		const getContentRatings = () => {
			axios
				.get(
					`https://api.themoviedb.org/3/tv/${movie.id}/content_ratings?api_key=1b3318f6cac22f830b1d690422391493&language=en-US&append_to_response=release_dates
      `
				)
				.then((response) => {
					// console.log(response.data.results)
					setReleaseDates(response.data.results)
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
				videoType: 'tv',
				multi: true,
			})
				.then((response) =>
					// console.log(response, 'herrrreeeee')
					setVideoId(response[0])
				)
				.catch((err) => console.log(err))
		}

		getSeriesDetails()
		getContentRatings()
		getMovieTrailer()
	}, [movie])

	const UsRating = releaseDates.filter(function (item) {
		return item.iso_3166_1 === 'US'
	})
	const rating = UsRating[0]?.rating

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
						<img
							// src={
							// 	'https://vidasalseracom.files.wordpress.com/2021/08/vivo-2-vidasalsera.jpg?w=1200'
							// }
							src={`${BASE_URL}/${movie.image}`}
							alt="movie cover"
						/>
					)}
					<div className="itemInfo">
						<p>{movie.name}</p>
						{/* <p>{movie.image}</p> */}
						<div className="icons">
							<div>
								<PlayArrowIcon
									className="icon"
									onClick={() => navigate('/watch', {
										state: { videoId: videoId, movie: movie }
									})}
								/>

								{/* on click add to my list mongo db */}
								<AddIcon className="icon" />

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

							<span>
								{/* if 1 season episodes.length and if more that 1 season seasons.length */}
								{showDetails.number_of_seasons > 1
									? `${showDetails.number_of_seasons} Seasons`
									: `${showDetails.number_of_episodes} Episodes`}
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
