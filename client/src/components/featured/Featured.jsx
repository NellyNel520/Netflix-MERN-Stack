import './featured.scss'
import React, { useState, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useNavigate } from 'react-router-dom'
import SelectGenre from '../selectGenre/SelectGenre'
import SelectGenreShows from '../selectGenre/SelectGenreShows'
import axios from 'axios'
import movieTrailer from 'movie-trailer'

const Featured = ({ type, genres, itemList, i }) => {
	const navigate = useNavigate()
	const [itemLogo, setItemLogo] = useState({})
	const BASE_URL = 'https://image.tmdb.org/t/p/original'
	const [videoId, setVideoId] = useState('')

	const id = itemList[i]?.id
	const title = itemList[i]?.name
	const image = itemList[i]?.image
	const details = itemList[i]?.overview
	const detailsLength = itemList[i]?.overview.length
	// console.log(id)
	// console.log(item)

	useEffect(() => {
		if (type) {
			axios
				.get(
					`https://api.themoviedb.org/3/${type}/${id}/images?api_key=1b3318f6cac22f830b1d690422391493&include_image_language=en
			`
				)
				.then((response) => {
					// console.log(response.data.logos, 'logo line 28')
					setItemLogo(response.data.logos[0].file_path)
				})
				.catch((error) => {
					console.log(error)
				})
		} else {
			axios
				.get(
					`https://api.themoviedb.org/3/movie/${id}/images?api_key=1b3318f6cac22f830b1d690422391493&include_image_language=en
			`
				)
				.then((response) => {
					// console.log(response.data.logos, 'logo line 37')
					setItemLogo(response.data.logos[0].file_path)
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}, [type, id])
	// console.log(itemLogo)

	useEffect(() => {
		const getMovieTrailer = async () => {
			await movieTrailer(title, {
				id: true,
				multi: true,
			})
				.then((response) =>
					// console.log(response, 'herrrreeeee')
					setVideoId(response[0])
				)
				.catch((err) => console.log(err))
		}

		getMovieTrailer()
	}, [])

	return (
		<div className="featured">
			{type === 'movie' && <SelectGenre type={type} genres={genres} />}

			{type === 'tv' && <SelectGenreShows type={type} genres={genres} />}

			<img src={`${BASE_URL}/${image}`} alt="movie" />

			<div className="info">
				<img src={`${BASE_URL}/${itemLogo}`} alt="movie logo" />

				<span className="desc">
					{detailsLength > 150 ? `${details.substring(0, 180)}...` : details}
				</span>
				<div className="buttons">
					<button
						className="play"
						onClick={() =>
							navigate('/watch', {
								state: { videoId: videoId },
							})
						}
					>
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
