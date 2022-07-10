import { useState } from 'react'

function UserSearch() {
  // form inputs are component level state
  const [text, setText] = useState('')

  const handleChange = (e) => {
    // update the text state to whatever user input in the search bar
    setText(e.target.value)
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      {/* Form */}
      <div>
        <form action="">
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

      {/* Clear button */}
      <div>
        <button className="btn btn-ghost btn-lg">
          Clear
        </button>
      </div>
    </div>
  )
}

export default UserSearch
