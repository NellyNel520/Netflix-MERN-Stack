import './series.scss' 
import Navbar from '../../components/navbar/Navbar'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getGenres, fetchShows } from '../../store'
import ShowScreenLists from '../../components/listContainer/ShowScreenLists'
import Featured from '../../components/featured/Featured'


const Series = () => { 
const shows = useSelector((state) => state.netflix.shows);
  const genres = useSelector((state) => state.netflix.genres); 
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate()
	const dispatch = useDispatch()
 
	useEffect(() => {
		dispatch(getGenres())
	}, []) 

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchShows({ genres, type: "tv" }));
    }
  }, [dispatch, genres, genresLoaded]);


  return (
    <div className='movies'>
      <Navbar />
      {/* <SelectGenre type='tv' genres={genres}/> */}
      <Featured type='tv' genres={genres} />

      <div className="listContainer">
				<ShowScreenLists shows={shows} />
			</div>
    </div>
  )
}

export default Series