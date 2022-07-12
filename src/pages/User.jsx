import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'

function User() {
  const { getUser, user } = useContext(GithubContext)
  // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
  // Get all the params from the URL
  const params = useParams()

  useEffect(() => {
    getUser(params.login); // Pass the login params from the URL
  }, []);

  return (
    <div>{user.login}</div>
  )
}

export default User
