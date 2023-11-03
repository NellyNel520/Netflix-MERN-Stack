import React, { useState, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import './trendingItem.scss'
import axios from 'axios'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'


 
 const TrendingShow = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false)
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
  const [showDetails, setShowDetails] = useState({})
	const [releaseDates, setReleaseDates] = useState([])
	const [videoId, setVideoId] = useState('')

  useEffect(() => {
		const getSeriesDetails = () => {
			axios
				.get(
					`	https://api.themoviedb.org/3/tv/${item.id}?api_key=1b3318f6cac22f830b1d690422391493&language=en-US&append_to_response=release_dates
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
					`https://api.themoviedb.org/3/tv/${item.id}/content_ratings?api_key=1b3318f6cac22f830b1d690422391493&language=en-US&append_to_response=release_dates
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
			await movieTrailer(item.name, {
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
	}, [item])


  const UsRating = releaseDates.filter(function (item) {
		return item.iso_3166_1 === 'US'
	})
	const rating = UsRating[0]?.rating
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
								<PlayArrowIcon className="icon" />
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
								{showDetails.number_of_seasons > 1 ? `${showDetails.number_of_seasons} Seasons` : `${showDetails.number_of_episodes} Episodes`} 
							</span>
              
							<span className="limit">HD</span>
						</div>

						{/* <div className="desc"> 
							{movie.overview.length > 150 ?
							`${movie.overview.substring(0, 150)}...` : movie.overview
							}
						</div> */}

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
 }
 
 export default TrendingShow