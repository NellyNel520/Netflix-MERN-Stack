import React, { useState, useEffect } from 'react'
import './listItem.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'

const ListItem = ({index}) => {
  const [isHovered, setIsHovered] = useState(false)
  const BASE_URL = 'https://image.tmdb.org/t/p/original'
  return (
    <div
    className="listItem"
    style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    onMouseEnter={() => setIsHovered(true)} 
    onMouseLeave={() => setIsHovered(false)}
  >

  {!isHovered ? (
    <img src={'https://vidasalseracom.files.wordpress.com/2021/08/vivo-2-vidasalsera.jpg?w=1200'} alt="movie cover" />
    
  ) : (null)}
    {/* <img src={`${BASE_URL}/${movie.backdrop_path}`} alt="movie cover" /> */}


    {isHovered && (
      <>
      <img src={'https://vidasalseracom.files.wordpress.com/2021/08/vivo-2-vidasalsera.jpg?w=1200'} alt="movie cover" />
      {/* <YouTube
          videoId={videoId}
          opts={{
            // height: '200px',
            // width: '438px',
            height: '140px',
            width: '325px',
            playerVars: { autoplay: 1, mute: 1 },
          }}
        /> */}
        {/* <video src={trailer} autoPlay={true} loop /> */}
        {/* <iframe className="video" src="https://www.youtube.com/embed/BOe8L69JpVI?autoplay=1&mute=1" title="movie title" frameborder="0" ></iframe> */}
        <div className="itemInfo">
          <p>Vivo</p>
          <div className="icons">
            <div>
              <PlayArrowIcon className="icon" />
              <AddIcon className="icon" />
              <ThumbUpAltOutlinedIcon className="icon" />
            </div>
            <KeyboardArrowDownOutlinedIcon className="infoIcon" /> 
          </div>

          <div className="itemInfoTop">
            {/* {rating ? (
              <span className="limit">{rating}</span>
            ) : (
              <span className="limit">NR</span>
            )} */}
            <span className="limit">NR</span>
            {/* <span className='time'>{runtime > 60 ? `${hours}h ${mins}m` : `${runtime}m`}</span> */}
            <span className='time'>1h 20m</span>
            <span className="limit">HD</span>
          </div>

          {/* <div className="desc">
            {movie.overview.length > 150 ?
            `${movie.overview.substring(0, 150)}...` : movie.overview
            }
          </div> */}

          <div className="genre">
            {/* {genreNames.slice(0, 4).map((name) => (
              <span className="test">{name}</span>
            ))} */}
            <span className="test">Comedy</span>
          </div>
        </div>
      </>
    )}
  </div>
  )
}

export default ListItem