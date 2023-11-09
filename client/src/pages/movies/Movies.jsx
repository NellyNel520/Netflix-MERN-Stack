import './movies.scss'
import Navbar from '../../components/navbar/Navbar'
import React, { useEffect } from 'react'
import Featured from '../../components/featured/Featured'
import MoviesScreenLists from '../../components/listContainer/MoviesScreenLists'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getGenres, getAllUsers, getSavedList} from '../../store'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


const Movies = () => { 
const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const { currentUser } = useContext(AuthContext)
	const email = currentUser.email
  const users = useSelector((state) => state.netflix.users)

	const dispatch = useDispatch()
  
	useEffect(() => {
		dispatch(getGenres()) 
    dispatch(getAllUsers())
	}, [])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
      dispatch(getSavedList({users, email}))
    }
  }, [dispatch, genres, genresLoaded, users, email]);


  return (
    <div className='movies'>
      <Navbar />
     
      <Featured type='movie' genres={genres} itemList={movies} i={8} />

      <div className="listContainer">
				<MoviesScreenLists movies={movies} />
			</div>
    </div>
  )
}

export default Movies