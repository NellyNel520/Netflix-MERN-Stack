import React, { useState, useEffect } from 'react'
import './featured.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useNavigate } from 'react-router-dom'
import { fetchShowDataByGenre, fetchDataByGenre } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import SelectGenre from '../selectGenre/SelectGenre'
import SelectGenreShows from '../selectGenre/SelectGenreShows'
import axios from 'axios'
import { API_KEY, TMDB_BASE_URL } from '../../utils/constants'

const Featured = ({ type, genres, itemList }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [itemLogo, setItemLogo] = useState({})
	const BASE_URL = 'https://image.tmdb.org/t/p/original'

	const rand = Math.floor(Math.random() * 15)
	const item = itemList[rand]
	const id = itemList[rand]?.id
	const image = itemList[rand]?.image
	// console.log(id)
	// console.log(item)

	useEffect(() => {
		if (type) {
			axios.get(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=1b3318f6cac22f830b1d690422391493&include_image_language=en
			`)
			.then((response) => {
				// console.log(response.data.logos, 'logo line 28')
				setItemLogo(response.data.logos[0].file_path)
			})
			.catch((error) => {
				console.log(error)
			})
		} else {
			axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=1b3318f6cac22f830b1d690422391493&include_image_language=en
			`)
			.then((response) => {
				// console.log(response.data.logos, 'logo line 37')
				setItemLogo(response.data.logos[0].file_path)
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}, [type, id])
	console.log(itemLogo)

	// include_image_language=en

	return (
		<div className="featured">
			{type === 'movie' && <SelectGenre type={type} genres={genres} />}

			{type === 'tv' && <SelectGenreShows type={type} genres={genres} />}

			<img
				// src="https://vidasalseracom.files.wordpress.com/2021/08/vivo-2-vidasalsera.jpg?w=1200"
				src={`${BASE_URL}/${image}`}
			
				alt="movie"
			/>

			<div className="info">
				<img
				
					// src="https://www.themoviedb.org/t/p/original/AsoF5slprur9YMifq9vUci0xnSg.png"
					src={`${BASE_URL}/${itemLogo}`}
					alt="movie logo"
				/>
				{/* <h1>{movieList[rand]?.title}</h1> */}

				<span className="desc">
					Vin Diesel's Dom Toretto is leading a quiet life off the grid with
					Letty and his son, little Brian, but they know that danger always
					lurks just over their peaceful horizon. This time, that threat will
					force Dom to confront the sins of his past if he's going to save those
					he loves most.
					{/* {movieList[rand]?.overview.length > 150 ?
							`${movieList[rand]?.overview.substring(0, 180)}...` : movieList[rand]?.overview
							} */}
				</span>
				<div className="buttons">
					<button className="play" onClick={() => navigate('/watch')}>
						<PlayArrowIcon />
						<span>Play</span>
					</button>

					<button className="more">
						<InfoOutlinedIcon />
						<span>More Info</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Featured
