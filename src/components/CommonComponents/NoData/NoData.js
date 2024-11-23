import './noData.css'

const NoData = props => {
  const {title} = props

  return (
    <div className="nodata-bg-container">
      <img
        src="https://res.cloudinary.com/dbdke7gop/image/upload/v1722488665/Layer_3_vhbyop.png"
        alt=""
      />
      <h1>{title}</h1>
    </div>
  )
}

export default NoData
