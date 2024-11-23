import {RiBuildingLine} from 'react-icons/ri'
import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'

import './index.css'

const Profile = props => {
  const {profiledata} = props
  const {
    avatarUrl,
    bio,
    company,
    organizationsUrl,
    followers,
    following,
    location,
    login,
    publicRepos,
    name,
  } = profiledata

  return (
    <div className="profile-container">
      <div className="profile-top-section-container">
        <div>
          <img src={avatarUrl} alt="" className="profile-pic" />
        </div>
        {name && <h1 className="name">{name}</h1>}
        {login && <p className="login-name">{login}</p>}
        {bio && <p className="bio">{bio}</p>}
      </div>
      <div className="stats-info">
        <div className="stats-container">
          <span className="stats-number">{followers}</span>
          <span className="stats-text">FOLLOWERS</span>
        </div>
        <div className="stats-container">
          <span className="stats-number">{following}</span>
          <span className="stats-text">FOLLOWING</span>
        </div>
        <div className="stats-container">
          <span className="stats-number">{publicRepos}</span>
          <span className="stats-text">PUBLIC REPO</span>
        </div>
      </div>
      <div className="company-details-container">
        <div className="company-sub-container">
          <span className="sub-text">Company</span>
          <div className="sub-details">
            <RiBuildingLine className="icons" />
            <span>{company}</span>
          </div>
        </div>
        <div className="company-sub-container company-desktop-version">
          <span className="sub-text">Company Url</span>
          <div className="sub-details">
            <IoMdLink className="icons" />
            <span>{organizationsUrl}</span>
          </div>
        </div>
        <div className="company-sub-container">
          <span className="sub-text">Location</span>
          <div className="sub-details">
            <IoLocationOutline />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="company-sub-container company-url-mobile-version">
          <span className="sub-text">Company Url</span>
          <div className="sub-details">
            <IoMdLink className="icons" />
            <span>{organizationsUrl}</span>
          </div>
        </div>
    </div>
  )
}

export default Profile
