import React, { useState, useEffect } from 'react'
import './featured.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useNavigate } from 'react-router-dom'
import {fetchShowDataByGenre, fetchDataByGenre} from '../../store'
import { useSelector, useDispatch } from 'react-redux'


const Featured = ({type, genres}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
  return (
  	<div className="featured">
			{type && (
				<div className="category">
					<span>{type === 'movie' ? 'Movies' : 'Series'}</span>
					<select name="genre" id="genre"
				onChange={(e) => {
					if (type === 'movies'){
						dispatch(
              fetchDataByGenre({genres, genre: e.target.value, type})
            ) 
					}
					if (type === 'tv'){
						dispatch(
              fetchDataByGenre({genres, genre: e.target.value, type})
            ) 
					}
				}}
					>
						{genres.map((genre) => {
              return (
              <option value={genre.id} key={genre.id}>{genre.name}</option> );
            }
            ) }


					</select>
				</div>
			)}

			<img
				//  src="https://assets-prd.ignimgs.com/2021/05/25/f9-blogroll-1621977019242.jpg"
				src="https://vidasalseracom.files.wordpress.com/2021/08/vivo-2-vidasalsera.jpg?w=1200"
        // src={`${BASE_URL}/${movieList[rand]?.backdrop_path}`}
				alt="movie"
			/>

			<div className="info">
				<img
					// src="https://www.universalpictures.com.au/tl_files/content/movies/fast9/title.png"
					src="https://www.themoviedb.org/t/p/original/AsoF5slprur9YMifq9vUci0xnSg.png"
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