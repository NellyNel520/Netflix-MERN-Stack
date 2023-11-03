import React from 'react'
import ShowList from '../list/ShowList'
import TrendingShowList from '../trendingList/TrendingShowList'

const ShowScreenLists = ({shows}) => {
  const getShowsFromRange = (from, to) => {
		return shows.slice(from, to)
	}
  return (
    <div>
      	<TrendingShowList
				data={getShowsFromRange(0, 10)}
				title="Top 10 Shows in the U.S. Today"
				type="tv"
			/>
			<ShowList data={getShowsFromRange(41, 55)} title="Must Watch" />
			<ShowList
				data={getShowsFromRange(11, 25)}
				type="tv"
				title="Binge Worthy"
			/>
			<ShowList
				data={getShowsFromRange(26, 40)}
				type="tv"
				title="Popular on Netflix"
			/>
    </div>
  )
}

export default ShowScreenLists