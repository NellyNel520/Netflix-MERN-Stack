import React from 'react'
import List from '../../components/list/List'
import TrendingList from '../../components/trendingList/TrendingList'

const MoviesScreenLists = ({ movies }) => {
	const getMoviesFromRange = (from, to) => {
		return movies.slice(from, to)
	}

	return (
		<div>
			<List
				data={getMoviesFromRange(11, 25)}
				type="movie"
				title="Trending Now"
			/>
			<TrendingList
				data={getMoviesFromRange(0, 10)}
				title="Top 10 Movies in the U.S. Today"
			/>
			<List
				data={getMoviesFromRange(26, 40)}
				title="New Releases"
				type="movie"
			/>
			<List
				data={getMoviesFromRange(41, 55)}
				title="Action & Adventure"
				type="movie"
			/>
		</div>
	)
}

export default MoviesScreenLists
