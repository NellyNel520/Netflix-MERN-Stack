import React, {useEffect} from 'react'
import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from '../../store'


const Home = () => {
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres()); 
    
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  // console.log(movies)
// console.log(genres)
  return (
    <div className='home'>
      <Navbar />
      <Featured />
{/* 
      <List />
      <List />
      <List />
      <List /> */}

      {genres ? genres.map((genre) => <List genre={genre} key={genre.id} genres={genres}/>) : (null)}


    </div>
  )
}

export default Home