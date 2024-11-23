import {useEffect, useContext, useState} from 'react'

import PieChartDig from '../CommonComponents/PieChartDig/PieChartDig'
import Header from '../Header/Header'
import LinearChartDig from './LinearChartDig'
import SearchedUserNameContext from '../../context/SearchedUserNameContext'
import apiKey from '../../constants'
import CommitHistory from './CommitHistory'
import './analysis.css'

const Analysis = () => {
  const {userNameSearched} = useContext(SearchedUserNameContext)
  const [analysisData, setAnalysisData] = useState()
  const [top10Data, setTop10Data] = useState()

  console.log('Analysis userName', userNameSearched)

  const getDetail = async () => {
    const analysisurl = `https://apis2.ccbp.in/gpv/profile-summary/${userNameSearched}?api_key=${apiKey}`
    console.log(analysisurl)
    const options = {
      method: 'GET',
    }
    const response = await fetch(analysisurl, options)
    console.log('Response - Analysis', response)

    if (response.ok) {
      const fetchData = await response.json()
      console.log('AnalysisfetchData', fetchData)
      const updatedData = {
        langCommitCount: fetchData.langCommitCount,
        quarterCommitCount: fetchData.quarterCommitCount,
        langRepoCount: fetchData.langRepoCount,
        repoCommitCountDescriptions: fetchData.repoCommitCountDescriptions,
        repoCommitCount: fetchData.repoCommitCount,
      }
      const top10pie = Object.keys(updatedData.repoCommitCount).reduce(
        (result, key) => ({
          ...result,
          [updatedData.repoCommitCountDescriptions[key]]:
            updatedData.repoCommitCount[key],
        }),
        {},
      )
      setTop10Data(top10pie)

      console.log(top10pie)

      console.log('updatedAnalysis', updatedData)

      setAnalysisData(updatedData)
    }
  }

  useEffect(() => {
    getDetail()
  }, [])

  return (
    <div className='analysis-bg-container'>
      <Header />
      {analysisData ? (
        <div className='analysis-charts-container'>
          <h1 className='analysis-heading'>Analysis </h1>
          <div className='bg-linear-chart'>
            <LinearChartDig data={analysisData.quarterCommitCount} />
          </div>
          <div className='analysis-desktop-piecharts'>
            <div>
              <h1 className='analysis-heading'>Language Per Repo</h1>
              <PieChartDig
                data={analysisData.langRepoCount}
                dataConversion
                innerRVal={70}
                outerRVal={110}
                chartWidth='370px'
                chartHeight='370px'
                cxVal='120'
                cyVal='148'
                legendalign='right'
                wrapperStyles={{marginLeft: -20, marginTop: -30}}
                width={400}
              />
            </div>
            <div className=''>
              <h1 className='analysis-heading'>Language Per Commits</h1>
              <PieChartDig
                data={analysisData.langCommitCount}
                dataConversion
                innerRVal={70}
                outerRVal={110}
                chartWidth='370px'
                chartHeight='370px'
                cxVal='120'
                cyVal='148'
                legendalign='right'
                wrapperStyles={{marginLeft: -20, marginTop: -30}}
                width={400}
              />
            </div>
          </div>

          <div>
            <h1 className='analysis-heading'>Commits Per Repo Top(10)</h1>
            <PieChartDig
              data={top10Data}
              dataConversion
              innerRVal={70}
              outerRVal={110}
              chartWidth='370px'
              chartHeight='370px'
              cxVal='120'
              cyVal='148'
              legendalign='right'
              width={600}
              wrapperStyles={{marginLeft: 300, marginTop: -30}}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        Commit History
      <CommitHistory/>
      </div>


    </div>
  )
}

export default Analysis
