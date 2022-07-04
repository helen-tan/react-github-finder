import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({title}) {
  return (
    <nav>
      Navbar
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Githubm Finder'
}

Navbar.propTypes = {
  title: PropTypes.string
}

export default Navbar
