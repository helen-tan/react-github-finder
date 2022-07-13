import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GithubActions'

function UserSearch() {
  // form inputs are component level state
  const [text, setText] = useState('')

  const { users, dispatch } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const handleChange = (e) => {
    // update the text state to whatever user input in the search bar
    setText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (text === '') {
      setAlert('Please enter something', 'error')
    } else {
      // set loading state
      dispatch({
        type: 'SET_LOADING'
      })

      // search users
      const users =  await searchUsers(text)
      dispatch({
        type: 'GET_USERS',
        payload: users
      })
      // Set text state back to empty
      setText("")
    }
  }

  const handleClick = (e) => {
    // Clear the users state - dispatch action to reducer
    dispatch({
      type: 'CLEAR_USERS'
    })
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      {/* Form */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value = {text}
                onChange={handleChange}
              />
              <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                Go
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Clear button (show only when there are users in the state) */}
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={handleClick}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
