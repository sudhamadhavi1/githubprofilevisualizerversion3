import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Home from './components/Home/Home'
import Repositories from './components/Repositories/Repositories'
import Analysis from './components/Analysis/Analysis'
import NotFound from './components/NotFound/NotFound'
import RepositoryItemDetails from './components/RepositoryItemDetails/RepositoryItemDetails'

import SearchedUserNameContext from './context/SearchedUserNameContext'
import './App.css'

const App = () => {
  const [userNameSearched, setUserNameSearched] = useState('')

  const onChangeSearchUserInput = userName => {
    setUserNameSearched(userName)
  }

  return (
    <SearchedUserNameContext.Provider
      value={{ userNameSearched, onChangeSearchUserInput }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/repositories/:repoName" element={<RepositoryItemDetails />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/not-found" element={<NotFound />} />
        {/* Catch-all route to redirect to NotFound */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </SearchedUserNameContext.Provider>
  )
}

export default App


