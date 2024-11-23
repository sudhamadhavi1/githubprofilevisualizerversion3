import React from 'react';
import {useEffect, useContext, useState} from 'react'


import { Circles } from 'react-loader-spinner'
import SearchedUserNameContext from '../../context/SearchedUserNameContext'
import './commitHistory.css'
import CommitGraph from './CommitGraph'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const CommitHistory = () => {
//   const {fullName, issuesCount} = props
//   console.log('fullName in commits', fullName)
const {userNameSearched} = useContext(SearchedUserNameContext)

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [eventData, setEventsData] = useState()

  const getEventDateDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const eventsUrl = `https://api.github.com/users/${userNameSearched}/events`
    console.log('Events URL', eventsUrl)
    const options = {
      method: 'GET',
    }
    const response = await fetch(eventsUrl, options)
    console.log('Events', response)
    // need to fectch the exact formatted data.

    if (response.ok) {
      const fetchData = await response.json()
      console.log("fetcheddata in eventsUrl", fetchData)
      const formattedDatesData=fetchData.map(eachEvent=>({
        createdDate:eachEvent.created_at
      }))
      console.log("formattedDatesData",formattedDatesData)

      const dateCounts = formattedDatesData.reduce((acc, item) => {
        const dateOnly = new Date(item.createdDate).toISOString().split('T')[0]; // Extract the date part
        acc[dateOnly] = (acc[dateOnly] || 0) + 1; // Increment count for the date
        return acc;
      }, {});
      
      // Step 2: Transform the map into the desired output array
      const sampleDates = Object.entries(dateCounts).map(([date, count]) => ({
        date: new Date(date),
        count
      }));
      
      console.log("sampleDates",sampleDates);
      
      setEventsData(sampleDates)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderCommitHistorySuccessView = () => (
   <div>
    <CommitGraph sampleDates={eventData}/>
   </div>
  )

  const renderFailureView = () => <div>Failure View</div>

  const renderLoadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Circles type='TailSpin' color='#3B82F6' height={50} width={50} />
    </div>
  )

  useEffect(() => {
    getEventDateDetails()
  }, [])

  const renderCommitHistory = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderCommitHistorySuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div>
  
    {renderCommitHistory()}
    </div>
   
  ) 
}

export default CommitHistory


