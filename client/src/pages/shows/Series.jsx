import './series.scss'
import Navbar from '../../components/navbar/Navbar'
import React, { useEffect } from 'react'
import SelectGenre from '../../components/selectGenre/SelectGenre'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getGenres, fetchShows } from '../../store'
import MoviesScreenLists from '../../components/listContainer/MoviesScreenLists'


const Series = () => { 
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
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [dispatch, genres, genresLoaded]);


  return (
    <div className='movies'>
      <Navbar />
      <SelectGenre type='tv' genres={genres}/>

      <div className="listContainer">
				<MoviesScreenLists movies={movies} />
			</div>
    </div>
  )
}

export default Series