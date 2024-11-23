import {useEffect, useContext, useState} from 'react'
import {Circles} from 'react-loader-spinner'
import SearchedUserNameContext from '../../context/SearchedUserNameContext'
import Header from '../Header/Header'
import BasicDetails from './BasicDetails/BasicDetails'
import CommitIssueDetails from './CommitIssueDetails/CommitIssueDetails'
import Contributors from './Contributors/Contributors'
import PieChartDig from '../CommonComponents/PieChartDig/PieChartDig'
import apiKey from '../../constants'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const RepositoryItemDetails = props => {
  const [repositoryItemDetails, setRepositoryItemDetails] = useState()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {userNameSearched} = useContext(SearchedUserNameContext)

  const getRepositoriesDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const {match} = props
    const {params} = match
    const {repoName} = params
    const url = `https://apis2.ccbp.in/gpv/specific-repo/${userNameSearched}/${repoName}?api_key=${apiKey} `
    console.log('RepoItemUrl', url)
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchData = await response.json()
      console.log(fetchData)
      const updatedData = {
        id: fetchData.id,
        description: fetchData.description,
        name: fetchData.name,
        stargazersCount: fetchData.stargazers_count,
        forksCount: fetchData.forks_count,
        languages: fetchData.lanuages,
        contributors: fetchData.contributors.map(eachcontributor => ({
          id: eachcontributor.id,
          avatarUrl: eachcontributor.avatar_url,
        })),
        openIssuesCount: fetchData.open_issues_count,
        fullName: fetchData.full_name,
      }
      console.log('Only requiredData', updatedData)
      setRepositoryItemDetails(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getRepositoriesDetails()
  }, [])

  const renderRepositoryDetailsSuccessView = () => (
    <div className="repo-item-success-bg">
      <BasicDetails repoItemDetails={repositoryItemDetails} />
      <CommitIssueDetails
        fullName={repositoryItemDetails.fullName}
        issuesCount={repositoryItemDetails.openIssuesCount}
      />
      <Contributors contributors={repositoryItemDetails.contributors} />
      {repositoryItemDetails.languages.length > 0 ? (
        <>
          <h1 className="repo-item-language-text">Languages :</h1>
          <div className="destop-pieChart">
            <PieChartDig
              data={repositoryItemDetails.languages}
              innerRVal={70}
              outerRVal={110}
              chartWidth="370px"
              chartHeight="370px"
              cxVal="120"
              cyVal="148"
              legendalign="right"
              wrapperStyles={{marginLeft: -20, marginTop: -30}}
              width={400}
            />
          </div>
          <div className="mobile-pieChart">
            <PieChartDig
              data={repositoryItemDetails.languages}
              innerRVal={50}
              outerRVal={80}
              chartWidth="280px"
              chartHeight="20px"
              cxVal="80"
              cyVal="120"
              wrapperStyles={{marginLeft: -20, marginTop: -100}}
              legendalign="center"
            />
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )

  const renderFailureView = () => <div>Failure View</div>

  const renderLoadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Circles type='TailSpin' color='#3B82F6' height={50} width={50} />
    </div>
  )
  const renderRepositoryDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderRepositoryDetailsSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="repository-item-bg-container">
      <Header />
      {renderRepositoryDetails()}
    </div>
  )
}

export default RepositoryItemDetails
