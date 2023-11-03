import React, { useState, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import './trendingItem.scss'


 
const TrendingItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false)
	const BASE_URL = 'https://image.tmdb.org/t/p/original'

  // *** Icebox feature will revisit (need to see if i can make call via redux and update the respective item from movie ** 
	// const [releaseDates, setReleaseDates] = useState([])
	// const [runtime, setRuntime] = useState('')

 

// *** Icebox ***
	// const hours = Math.floor(runtime / 60)
	// const mins = runtime % 60
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
							{/* {rating ? (
								<span className="limit">{rating}</span>
							) : (
								<span className="limit">NR</span>
							)} */}
              <span className="limit">NR</span>

							{/* <span className="time">
								{runtime > 60 ? `${hours}h ${mins}m` : `${runtime}m`}
							</span> */}
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

export default TrendingItem