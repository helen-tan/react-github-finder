import { useEffect, useState } from 'react'
import Spinner from '../layouts/Spinner'

function UserResults() {
  const [users, setUsers] = useState([])
  // loader for API request
  const [loading, setLoading] = useState(true)

  // execute when component loads
  useEffect(() =>{
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })

    const data = await response.json();

    setUsers(data);
    setLoading(false);
  }

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => {
          return <h3 key={user.id}>{user.login}</h3>
        })}
      </div>
    )
  } else {
    return <Spinner />
  }

}

export default UserResults
