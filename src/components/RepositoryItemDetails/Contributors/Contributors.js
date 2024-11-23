import {GoGitBranch} from 'react-icons/go'
import {FaRegStar, FaStar} from 'react-icons/fa'

import './index.css'

const Contributors = props => {
  const {contributors} = props
  const totalContributors = contributors.length
  const displayContributors =
    totalContributors > 5 ? contributors.slice(0, 5) : contributors

  return (
    <>
      <h1 className="contributors-heading">Contributors :</h1>
      <p className="contributor-description">
        {totalContributors} {totalContributors > 1 ? 'Members' : 'Member'}
      </p>
      <div className="contributor-list-containor">
        <ul className="contributorsList">
          {displayContributors.map(eachContributor => (
            <li className="each-contributor" key={eachContributor.id}>
              <img
                src={eachContributor.avatarUrl}
                alt=""
                className="avatar-image"
              />
            </li>
          ))}
        </ul>
        {totalContributors > 5 ? (
          <div className="count-image avatar-image">
            +{totalContributors - 5}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Contributors
