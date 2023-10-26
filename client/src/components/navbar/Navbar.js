import React, { useState, useContext } from 'react'
import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true)
		return () => (window.onscroll = null)
	}


  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
			<div className="container">
				<div className="left">
					<img
						alt=""
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
					/>
					<Link to={'/'} className='link'>
						<span>Homepage</span>
					</Link>
					<Link className='link'>
						<span>Series</span>
					</Link>
					<Link  className='link'>
						<span>Movies</span>
					</Link>
					<Link className='link'>
						<span>New and Popular</span>
					</Link>
					<Link className='link'>
						<span>My List</span>
					</Link>
				</div>
				<div className="right">

        <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
					<SearchIcon className="icon" />

          </button>
          <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />

          </div>



					<span>KIDS</span>
					<NotificationsIcon className="icon" />
					<img
						alt=""
						src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"
					/>
					<div className="profile">
						<ArrowDropDownIcon className="icon" />
						<div className="options">
							<span>Settings</span>
							<span onClick={() => signOut(firebaseAuth)}>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default Navbar