import {Link} from 'react-router-dom'
import {GoGitBranch} from 'react-icons/go'
import {FaRegStar, FaStar} from 'react-icons/fa'
import './index.css'

const RepositoryCard = props => {
  const {eachRepo} = props
  const {name, description, forksCount, languages, stargazersCount} = eachRepo

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
      stargazersCount === 0 ? (
        <FaRegStar className="repo-card-unfilled-star" />
      ) : (
        <FaStar className="repo-card-star-color" />
      )

    return (
      <div className="repo-card-star-fork-container">
        <div className="repo-card-star-container">
          {star}
          <span className="repo-card-count">{stargazersCount}</span>
        </div>
        <div className="repo-card-fork-container">
          <GoGitBranch className="repo-card-gitbranch" />
          <span className="repo-card-count">{forksCount}</span>
        </div>
      </div>
    )
  }

  return (
    <Link to={`repositories/${name}`} className="repo-link-style">
      <li className="repo-card">
        <h1 className="repo-title">{name}</h1>
        {description && <p className="repo-description">{description}</p>}
        {languages.length > 0 ? (
          <ul className="repo-card-list-languages">
            {languages.map((eachLang, index) => {
              const textColorIndex = index % textColor.length
              const bgColorIndex = index % bgColor.length

              return (
                <li
                  className="repo-card-each-language"
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
        ) : (
          ''
        )}
        {starForkUI()}
      </li>
    </Link>
  )
}

export default RepositoryCard
