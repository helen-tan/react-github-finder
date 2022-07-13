// 1. import the createContect function from react
import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

// 2. Create the context
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// 3. Export provider function
export const GithubProvider = ( { children } ) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  // dispatch is a useReducer hook function that dispatches an action to the reducer
  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING'
    })
  }

  // Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await response.json();

    // dispatch takes an action object (type is an uppercase string)
    dispatch({
      type: 'GET_USERS',
      payload: data // The payload is additional information to perform the state transition (optional).
    })

  }



  return <GithubContext.Provider value={
    {
      ...state,
      dispatch,
      fetchUsers
    }
  }>
    {children}
  </GithubContext.Provider>
}

export default GithubContext;

// To use the Context:
// In App.js:
// import GithubProvider, and wrap it around the children that need access to the data in the Context
// In components
// import GithubContext & useContext hook
// specify the data that you want: E.g. - const { users, loading, fetchUsers } = useContext(GithubContext)
