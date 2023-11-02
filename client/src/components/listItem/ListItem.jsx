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
import { API_KEY, TMDB_BASE_URL } from "../../utils/constants";

const ListItem = ({ index, movie, genres }) => {
	const [isHovered, setIsHovered] = useState(false)
	// const [genreNames, setGenreNames] = useState([])
	// const [runtime, setRuntime] = useState('')
	// const [releaseDates, setReleaseDates] = useState([])
	// const [videoId, setVideoId] = useState('')
	// const genreIds = movie.genre_ids
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const navigate = useNavigate()
	console.log(movie)

	// useEffect(() => {
	// 	const getGenreTitle = () => {
	// 		try {
	// 			const movieGenres = genres.filter(function (item) {
	// 				return genreIds.indexOf(item.id) > -1
	// 			})
	// 			const genreTitles = movieGenres.map((s) => s.name)
	// 			// console.log(movieGenres)
	// 			// console.log(genreTitles.toString())
	// 			setGenreNames(genreTitles)
	// 		} catch (err) {
	// 			console.log(err)
	// 		}
	// 	}

	// 	const getRunTime = () => {
	// 		axios
	// 			.get(
	// 				`${TMDB_BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates
	// 	`
	// 			)
	// 			.then((response) => {
	// 				// console.log(response.data.release_dates.results)
	// 				setRuntime(response.data.runtime)
	// 				setReleaseDates(response.data.release_dates.results)
	// 			})
	// 			.catch((error) => {
	// 				console.log(error)
	// 			})
	// 	}


	// 	getGenreTitle()
	// 	getRunTime()
	// }, [movie, genres, genreIds])

	// console.log(genreNames)

	// const releaseDate = new Date(movie.release_date)
	// const releaseYear = releaseDate.getFullYear()
	// const hours = Math.floor(runtime / 60)
	// const mins = runtime % 60

	// const UsRating = releaseDates.filter(function (item) {
	// 	return item.iso_3166_1 === 'US'
	// })
	// const rating = UsRating[0]?.release_dates[0]?.certification
	// // console.log(rating)

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
					<img
						src={
							'https://vidasalseracom.files.wordpress.com/2021/08/vivo-2-vidasalsera.jpg?w=1200'
						}
						// src={`${BASE_URL}/${movie.backdrop_path}`} 
						alt="movie cover"
					/>
					{/* <YouTube
          videoId={videoId}
          opts={{
            // height: '200px',
            // width: '438px',
            height: '140px',
            width: '325px',
            playerVars: { autoplay: 1, mute: 1 },
          }}
        /> */}
					{/* <video src={trailer} autoPlay={true} loop /> */}
					{/* <iframe className="video" src="https://www.youtube.com/embed/BOe8L69JpVI?autoplay=1&mute=1" title="movie title" frameborder="0" ></iframe> */}
					<div className="itemInfo">
						{/* <p>{movie.title}</p> */}
						<p>Vivo</p>
						<div className="icons">
							<div>
								<PlayArrowIcon
									className="icon"
									onClick={() => navigate('/watch')}
								/>

								{/* on click add to my list mongo db */}
								<AddIcon className="icon" />

								<ThumbUpAltOutlinedIcon className="icon" />
							</div>
							<KeyboardArrowDownOutlinedIcon className="infoIcon" />
						</div>

						<div className="itemInfoTop">
							{/* {rating ? (
              <span className="limit">{rating}</span>
            ) : (
              <span className="limit">NR</span>
            )} */}
							<span className="limit">NR</span>
							{/* <span className='time'>{runtime > 60 ? `${hours}h ${mins}m` : `${runtime}m`}</span> */}
							<span className="time">1h 20m</span>
							<span className="limit">4K</span>
						</div>

						{/* <div className="desc">
            {movie.overview.length > 150 ?
            `${movie.overview.substring(0, 150)}...` : movie.overview
            }
          </div> */}

						<div className="genre">
							{/* {genreNames.slice(0, 4).map((name) => (
              <span className="test">{name}</span>
            ))} */}
							<span className="test">Comedy</span>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default ListItem
