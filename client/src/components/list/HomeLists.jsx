import React from 'react'
import List from './List'
import ShowList from './ShowList'
import TrendingList from '../trendingList/TrendingList'
import TrendingShowList from '../trendingList/TrendingShowList'



const HomeLists = ({ movies, shows }) => {
	const getMoviesFromRange = (from, to) => {
		return movies.slice(from, to)
	}
	const getShowsFromRange = (from, to) => {
		return shows.slice(from, to)
	}

	return ( 
		<div>
			
				<TrendingList data={getMoviesFromRange(0, 10)} title="Top 10 Movies" />
				<List data={getMoviesFromRange(11, 25)} type='movie' title="Trending Now" />
        <List data={getMoviesFromRange(26, 40)} title="New Releases" type='movie' />
        <List data={getMoviesFromRange(41, 55)} title="Action & Adventure" type='movie' />
        <TrendingShowList data={getShowsFromRange(0, 10)} title="Top 10 Shows" type='tv' />
				<List data={getMoviesFromRange(41, 55)} title="Must Watch" />
				<ShowList data={getShowsFromRange(11, 25)} type='tv' title="Binge Worthy" />
        <ShowList data={getShowsFromRange(26, 40)} type='tv' title="Popular on Netflix" />
	\
		</div>
	)
}

export default HomeLists
