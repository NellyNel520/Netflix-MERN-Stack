import './watch.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import YouTube from 'react-youtube'

const Watch = () => {
	const location = useLocation()
	let navigate = useNavigate()
	const videoId = location.state.videoId

	// Icebox add movie title beside back button only shown when mouse is active
	// const movie = location.state.movie

	// console.log(movie)
	// console.log(videoId)

	return (
		<div className="watch">
			<div className="back" onClick={() => navigate(-1)}>
				<ArrowBackIosNewOutlinedIcon />
				{/* Home */}
			</div>
			<YouTube
				videoId={videoId}
				className="video"
				opts={{
					height: '810px',
					width: '1440px',
					playerVars: { autoplay: 1, mute: 1 },
				}}
			/>
		</div>
	)
}

export default Watch
