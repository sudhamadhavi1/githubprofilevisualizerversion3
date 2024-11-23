import './index.css'
import React from 'react'
import {useHistory} from 'react-router-dom'

const InValidUserName = props => {
  const history = useHistory()
  const onClickGoHome = () => {
    history.push('/')
  }

  return (
    <div className="invalid-bg-container">
      <img
        src="https://res.cloudinary.com/dbdke7gop/image/upload/v1722490519/Empty_Box_Illustration_1_1_xebmqs.png"
        alt=""
      />
      <h1 className="title">No Data Found</h1>
      <p className="description">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
      <button className="go-home-btn" onClick={onClickGoHome}>
        Go to Home
      </button>
    </div>
  )
}

export default InValidUserName
