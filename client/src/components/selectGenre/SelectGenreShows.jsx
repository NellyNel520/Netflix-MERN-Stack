import './selectGenre.scss'
import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchShowDataByGenre } from '../../store'

function SelectGenreShows({ type, genres }) {
	const dispatch = useDispatch()

	return (
		<div className="container">
			<div className="category">
				<span>{type === 'movie' ? 'Movies' : 'Series'}</span>
				<select
					name="genre"
					id="genre"
					onChange={(e) => {
						dispatch(
							fetchShowDataByGenre({ genres, genre: e.target.value, type })
						)
					}}
				>
					{genres.map((genre) => {
						return (
							<option value={genre.id} key={genre.id}>
								{genre.name}
							</option>
						)
					})}
				</select>
			</div>
		</div>
	)
}

export default SelectGenreShows
