import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'
import { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../components/layouts/Spinner'
import GithubContext from '../context/github/GithubContext'

function User() {
  const { getUser, user, loading } = useContext(GithubContext)
  // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
  // Get all the params from the URL
  const params = useParams()

  useEffect(() => {
    getUser(params.login); // Pass the login params from the URL
  }, []);

  // Destructure from the user object, these:
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user

  if(loading) {
    return <Spinner />
  }

  return (
    <>
    <div className="w-full mx-auto lg:w-10/12">
      <div className="mb-4">
        <Link to='/' className='btn btn-ghost'>
          Back To Search
        </Link>
      </div>
    </div>
    </>
  )
}

export default User
