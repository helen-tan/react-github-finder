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

  // Get search results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    // destructuring to get only the 'items' from the returned data
    const { items } = await response.json();

    // dispatch takes an action object (type is an uppercase string)
    dispatch({
      type: 'GET_USERS',
      payload: items // The payload is additional information to perform the state transition (optional).
    })

  }

  // Delete all users from state
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS'
    })
  }

  // Get a single user
  const getUser = async (login) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    // if name/login is not a valid user, redirect to notfound page
    if(response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data
      })
    }

  }

  // Get user repos
  const getUserRepos = async (login) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await response.json();

    dispatch({
      type: 'GET_REPOS',
      payload: data
    })

  }

  return <GithubContext.Provider value={
    {
      users: state.users,
      loading: state.loading,
      user: state.user,
      repos: state.repos,
      fetchUsers,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
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
