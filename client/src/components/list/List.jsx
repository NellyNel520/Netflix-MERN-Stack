 import React, { useEffect, useRef, useState } from 'react'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import './list.scss'
import ListItem from '../listItem/ListItem'

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataByGenre } from '../../store'
import axios from 'axios'
import { API_KEY, TMDB_BASE_URL } from "../../utils/constants";

export default React.memo(function List ({data, title, type })  {
  const [isMoved, setIsMoved] = useState(false) 
	const [slideNumber, setSliderNumber] = useState(0)
	const listRef = useRef()
	const dispatch = useDispatch(); 


  const handleClick = (direction) => {
		setIsMoved(true)
		let distance = listRef.current.getBoundingClientRect().x - 50
		if (direction === 'left' && slideNumber > 0) {
			setSliderNumber(slideNumber - 1)
			listRef.current.style.transform = `translateX(${230 + distance}px)`
		}

		if (direction === 'right' && slideNumber < 5) {
			setSliderNumber(slideNumber + 1)
			listRef.current.style.transform = `translateX(${-230 + distance}px)`
		}
	}




  return (
   <div className="list">
			<span className="listTitle">{title}</span>
			<div className="wrapper">
				<ArrowBackIosNewOutlinedIcon
					className="sliderArrow left"
					onClick={() => handleClick('left')}
					style={{ display: !isMoved && 'none' }}
				/>
				<div className="container" ref={listRef}>
					{/* <ListItem index={0}/>
					<ListItem index={1}/>
					<ListItem index={2}/>
					<ListItem index={3}/>
					<ListItem index={4}/>
					<ListItem index={5}/> 
					<ListItem index={6}/>
					<ListItem index={7}/>
					<ListItem index={8}/> 
					<ListItem index={9}/> */}



					{data.map((movie, i) => (
						<ListItem index={i} movie={movie} key={movie.id} type={type}
						// genres={genres}
						 />
					))}
				</div>

				<ArrowForwardIosOutlinedIcon
					className="sliderArrow right"
					onClick={() => handleClick('right')}
				/>
			</div>
		</div>
  )
})

// export default List