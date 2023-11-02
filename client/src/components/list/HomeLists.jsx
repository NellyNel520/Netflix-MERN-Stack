import React from 'react'
import List from './List'

const HomeLists = ({movies, shows}) => {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  const getShowsFromRange = (from, to) => {
    return shows.slice(from, to);
  };


  return (
    <div>
      <List  data={getMoviesFromRange(10, 25)} title="Popular on Netflix" />
      <List  data={getMoviesFromRange(25, 40)} title="Must Watch" />
      <List  data={getShowsFromRange(10, 25)} title="Binge Worthy" />
    </div>
  )
}

export default HomeLists