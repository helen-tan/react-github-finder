const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Get search results
export const searchUsers = async (text) => {

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

  return items
}

// Get a single user
export const getUser = async (login) => {

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

    return data
  }

}

// Get user repos
export const getUserRepos = async (login) => {

  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  })

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const data = await response.json();

  return data
}
