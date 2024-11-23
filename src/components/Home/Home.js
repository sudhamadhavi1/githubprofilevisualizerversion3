import {useState, useEffect, useContext} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {Circles} from 'react-loader-spinner'

import NoInternet from '../CommonComponents/NoInternet/NoInternet'
import Header from '../Header/Header'
import SearchedUserNameContext from '../../context/SearchedUserNameContext'
import apiKey from '../../constants'
import Profile from './Profile/Profile'
import './home.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const {userNameSearched, onChangeSearchUserInput} = useContext(
    SearchedUserNameContext,
  )
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [enterValue, setEnterValue] = useState('')
  const [profiledata, setProfileData] = useState(null)

  const [error, setError] = useState('')

  const getProfileDetail = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    if (userNameSearched) {
      const url = `https://apis2.ccbp.in/gpv/profile-details/${userNameSearched}?api_key=${apiKey}`
      const options = {
        method: 'GET',
      }

      try {
        const response = await fetch(url, options)
        if (response.ok) {
          const fetchData = await response.json()
          const updatedData = {
            avatarUrl: fetchData.avatar_url,
            bio: fetchData.bio,
            blog: fetchData.blog,
            company: fetchData.company,
            createdAt: fetchData.created_at,
            email: fetchData.email,
            eventsUrl: fetchData.events_url,
            followers: fetchData.followers,
            following: fetchData.following,
            id: fetchData.id,
            location: fetchData.location,
            login: fetchData.login,
            publicRepos: fetchData.public_repos,
            name: fetchData.name,
            organizationsUrl: fetchData.organizations_url,
          }
          setProfileData(updatedData)
          setApiStatus(apiStatusConstants.success)
          setError('')
        } else {
          setApiStatus(apiStatusConstants.failure)
        }
      } catch (errorMSG) {
        console.error('Fetch error:', error)
        setApiStatus(apiStatusConstants.failure)
      }
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    if (userNameSearched) {
      getProfileDetail()
    }
  }, [userNameSearched])



  const onChangeSearchValue = event => setEnterValue(event.target.value)

  const onClickSearchBtn = () => {
    if (enterValue.trim() === '') {
      setError('Enter a valid github username')
      setApiStatus(apiStatusConstants.failure)
    } else {
      onChangeSearchUserInput(enterValue)
    }
  }

  const searchInput = () => (
    <div className="input-search-container">
      <input
        type="search"
        placeholder="Enter github username"
        onChange={onChangeSearchValue}
        value={enterValue}
        className={`input-container ${error ? 'error-input' : ''}`}
      />
      <button
        aria-label="search button"
        type="button"
        onClick={onClickSearchBtn}
        data-testid="searchButton"
        className="search-button"
      >
        <HiOutlineSearch className="search-icon" />
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  )

  const onClickTryAgain = () => {
    setApiStatus(apiStatusConstants.initial)
    getProfileDetail()
  }


  const initialView = () => (
    <div className="home-initial-container">
  {searchInput()}
  <div className="home-initial-image-container">
    <img
      src="https://res.cloudinary.com/dbdke7gop/image/upload/v1722322644/Frame_8830_uxydzd.png"
      alt="github profile visualizer home page"
      className="home-image"
    />
  </div>
  </div>
)



  const renderFailureView = () => <NoInternet onClickTry={onClickTryAgain} />

  const renderLoadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Circles type='TailSpin' color='#3B82F6' height={50} width={50} />
    </div>
  )

  const renderProfileSuccessView = () => (
    <div className="profile-success-view">
      <div className="header-mobile-version">
        <Header />
      </div>
      {searchInput()}
      <Profile profiledata={profiledata} />
    </div>
  )

  const renderHomeDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return initialView()
      case apiStatusConstants.success:
        return renderProfileSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    < div className="home-bg-container">
      <div className="large-devices-header">
        <Header />
      </div>
    
      {renderHomeDetails()}
    
    
    </div>
  )
}

export default Home
