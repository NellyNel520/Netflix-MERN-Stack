import React, { useState, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import './trendingItem.scss'
import axios from 'axios'


 
 const TrendingShow = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false)
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
  const [showDetails, setShowDetails] = useState({})
	const [releaseDates, setReleaseDates] = useState([])

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

    getSeriesDetails()
    getContentRatings()
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
				<img
						src={`${BASE_URL}/${item.image}`}
						alt="movie cover"
					/>

					{/* <YouTube
						videoId={videoId2}
						opts={{
							height: '180px',
							width: '430px',
							playerVars: { autoplay: 1, mute: 1 },
						}}
					/> */}
					{/* <video src={trailer} autoPlay={true} loop /> */}
					
		
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