import React, {useContext} from 'react'

const SearchedUserNameContext = React.createContext()

export const useSearchedUserNameContext = () => {
  const userNameContext = useContext(SearchedUserNameContext)
  return userNameContext
}

export default SearchedUserNameContext
