import {Link, useLocation} from 'react-router-dom'
import './header.css'
import {GiHamburgerMenu} from 'react-icons/gi'

import {useState} from 'react'

const Header = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="nav-header">
        <Link to="/" className="link-git">
          <h1 className="github-text">Github Profile Visualizer</h1>
        </Link>
        <ul className="right-section">
          <Link
            to="/"
            className={`link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <li>Home</li>
          </Link>
          <Link
            to="/repositories"
            className={`link ${
              location.pathname === '/repositories' ? 'active' : ''
            }`}
          >
            <li>Repositories</li>
          </Link>
          <Link
            to="/analysis"
            className={`link ${
              location.pathname === '/analysis' ? 'active' : ''
            }`}
          >
            <li>Analysis</li>
          </Link>
        </ul>
      </nav>
      <nav className="mobile-version-header">
        <div className='initial-view'>

        
        <Link to="/" className="link-git">
          <h1 className="github-text">Github Profile Visualizer</h1>
        </Link>
        <button  className="hamburger-button" type="button" onClick={() => setIsOpen(!isOpen)} alt="menu">
          <GiHamburgerMenu />
        </button>
        </div>

        {isOpen && (
          <>
            <ul className="mobile-section">
              <Link
                to="/"
                className={`link ${location.pathname === '/' ? 'active' : ''}`}
              >
                <li>Home</li>
              </Link>
              <Link
                to="/repositories"
                className={`link ${
                  location.pathname === '/repositories' ? 'active' : ''
                }`}
              >
                <li>Repositories</li>
              </Link>
              <Link
                to="/analysis"
                className={`link ${
                  location.pathname === '/analysis' ? 'active' : ''
                }`}
              >
                <li>Analysis</li>
              </Link>
            </ul>
          </>
        )}
      </nav>
    </>
  )
}

export default Header
