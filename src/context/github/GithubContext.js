// 1. import the createContect function from react
import { createContext, useState } from 'react'

// 2. Create the context
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// 3. Export provider function
export const GithubProvider = ( { children } ) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)   // loader for API request

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await response.json();

    setUsers(data);
    setLoading(false);
  }

  return <GithubContext.Provider value={
    {
      users,
      loading
    }
  }>
    {children}
  </GithubContext.Provider>
}

export default GithubContext;
