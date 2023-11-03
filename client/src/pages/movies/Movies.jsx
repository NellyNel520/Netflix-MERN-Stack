import React, { useEffect } from 'react'
import './movies.scss'
import Navbar from '../../components/navbar/Navbar'
import SelectGenre from '../../components/selectGenre/SelectGenre'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getGenres, fetchShows } from '../../store'
import MoviesScreenLists from '../../components/listContainer/MoviesScreenLists'


const Movies = () => {
const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate()
	const dispatch = useDispatch()
 
	useEffect(() => {
		dispatch(getGenres())
	}, [])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [dispatch, genres, genresLoaded]);


  return (
    <div className='movies'>
      <Navbar />
      <SelectGenre type='movie' genres={genres}/>

      <div className="listContainer">
				<MoviesScreenLists movies={movies} />
			</div>
    </div>
  )
}

export default Movies