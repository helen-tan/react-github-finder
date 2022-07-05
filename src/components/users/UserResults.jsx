import { useEffect, useState } from 'react'

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

  return (
    <div>User Results</div>
  )
}

export default UserResults
