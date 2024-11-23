import {GoGitBranch} from 'react-icons/go'
import {FaRegStar, FaStar} from 'react-icons/fa'

import './index.css'

const BasicDetails = props => {
  const {repoItemDetails} = props
  const {description, name, forksCount, languages} = repoItemDetails
  const textColor = [
    '#E879F9',
    '#4ADE80',
    '#38BDF8',
    '#F472B6',
    '#FBBF24',
    '#C084FC',
  ]
  const bgColor = [
    '#C026D3',
    '#22C55E',
    '#0284C7',
    '#DB2777',
    '#F59E0B',
    '#9333EA',
  ]

  const starForkUI = () => {
    const star =
      repoItemDetails.stargazersCount === 0 ? (
        <FaRegStar className="unfilled-star" />
      ) : (
        <FaStar className="star-color" />
      )

    return (
      <div className="star-fork-container">
        <div className="star-container">
          {star}
          <span className="count">{repoItemDetails.stargazersCount}</span>
        </div>
        <div className="fork-container">
          <GoGitBranch />
          <span className="count">{forksCount}</span>
        </div>
      </div>
    )
  }
  return (
    <>
      <h1 className="repo-item-heading">{name}</h1>
      {description && <p className="repo-item-description">{description}</p>}
      <ul className="list-languages">
        {languages.map((eachLang, index) => {
          const textColorIndex = index % textColor.length
          const bgColorIndex = index % bgColor.length

          return (
            <li
              className="each-language"
              style={{
                color: textColor[textColorIndex],
                backgroundColor: bgColor[bgColorIndex],
              }}
              key={eachLang.name}
            >
              <span>{eachLang.name}</span>
            </li>
          )
        })}
      </ul>
      {starForkUI()}
    </>
  )
}

export default BasicDetails
