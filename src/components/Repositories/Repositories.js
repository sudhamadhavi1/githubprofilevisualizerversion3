import {useEffect, useContext, useState} from 'react'

import Header from '../Header/Header'
import SearchedUserNameContext from '../../context/SearchedUserNameContext'
import RepositoryCard from './RepositoryCard/RepositoryCard'
import apiKey from '../../constants'

import './index.css'

const Repositories = () => {
  const {userNameSearched} = useContext(SearchedUserNameContext)
  const [repolist, setRepolist] = useState([])

  console.log('Repor userName', userNameSearched)

  const getDetail = async () => {
    const repourl = `https://apis2.ccbp.in/gpv/repos/${userNameSearched}?api_key=${apiKey}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(repourl, options)

    if (response.ok) {
      const fetchData = await response.json()
      console.log('RepofetchData', fetchData)

      const updatedData = fetchData.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        description: eachRepo.description,
        forksCount: eachRepo.forks_count,
        language: eachRepo.language,
        languages: eachRepo.languages,
        stargazersCount: eachRepo.stargazers_count,
        commitsUrl:eachRepo.commits_url
      }))

      console.log('updatedDataRepo', updatedData)
      setRepolist(updatedData)
    }
  }

  useEffect(() => {
    getDetail()
  }, [userNameSearched])

  return (
    <div className="repo-main-container">
      <Header />
      <h1 className="repositories-heading">Repositories</h1>
      {repolist.length > 0 ? (
        <ul className="repo-card-list">
          {repolist.map(eachRepo => (
            <RepositoryCard eachRepo={eachRepo} key={eachRepo.id} />
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}

export default Repositories
