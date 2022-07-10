import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'

function UserSearch() {
  // form inputs are component level state
  const [text, setText] = useState('')

  const { users, searchUsers } = useContext(GithubContext)

  const handleChange = (e) => {
    // update the text state to whatever user input in the search bar
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text === '') {
      alert('Please enter something')
    } else {
      // search users
      searchUsers(text)
      // Set text state back to empty
      setText("")
    }
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
          <button className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
