import './index.css'

const NoInternet = props => {
  const {onClickTryAgain} = props

  return (
    <div className="bg-container">
      <img
        src="https://res.cloudinary.com/dbdke7gop/image/upload/v1722489586/Group_7522_vyly4u.png"
        alt=""
      />
      <h1 className="title">Something went wrong. Please try again</h1>
      <button className="try-again-button" onClick={() => onClickTryAgain()}>
        Try Again
      </button>
    </div>
  )
}

export default NoInternet
