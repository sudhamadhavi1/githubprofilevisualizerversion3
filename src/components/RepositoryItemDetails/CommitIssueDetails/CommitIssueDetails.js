import {useEffect, useState} from 'react'
import {Circles} from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const CommitIssueDetails = props => {
  const {fullName, issuesCount} = props
  console.log('fullName in commits', fullName)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [commitsCount, setCommitsCount] = useState(0)

  const getCommitsDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const commitsUrl = `https://api.github.com/repos/${fullName}/commits`
    console.log('RepoItemUrl Coomits', commitsUrl)
    const options = {
      method: 'GET',
    }
    const response = await fetch(commitsUrl, options)
    console.log('Conmmits', response)
    if (response.ok) {
      const fetchData = await response.json()
      const commitsCountupdated = fetchData.length
      setCommitsCount(commitsCountupdated)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderCommitIssueSuccessView = () => (
    <div className='commit-issue-container'>
      <div className='commit-issue-sub-container'>
        <p className='commit-issue-text'>Commits Count</p>
        <p className='commit-issue-count'>
          {commitsCount < 10 ? `0${commitsCount}` : commitsCount}
        </p>
      </div>
      <div className='commit-issue-sub-container'>
        <p className='commit-issue-text'>Issues Count</p>
        <p className='commit-issue-count'>
          {issuesCount < 10 ? `0${issuesCount}` : issuesCount}
        </p>
      </div>
    </div>
  )

  const renderFailureView = () => <div>Failure View</div>

  const renderLoadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Circles type='TailSpin' color='#3B82F6' height={50} width={50} />
    </div>
  )

  useEffect(() => {
    getCommitsDetails()
  }, [])

  const renderCommitIssueCount = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderCommitIssueSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return <>{renderCommitIssueCount()}</>
}

export default CommitIssueDetails
