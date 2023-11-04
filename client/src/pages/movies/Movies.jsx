import './movies.scss'
import Navbar from '../../components/navbar/Navbar'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getGenres, fetchShows } from '../../store'
import Featured from '../../components/featured/Featured'
import MoviesScreenLists from '../../components/listContainer/MoviesScreenLists'


const Movies = ({currentUser}) => { 
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
      {/* <SelectGenre type='movie' genres={genres}/> */}
      <Featured type='movie' genres={genres} itemList={movies} i={8} />

      <div className="listContainer">
				<MoviesScreenLists movies={movies} />
			</div>
    </div>
  )
}

export default Movies