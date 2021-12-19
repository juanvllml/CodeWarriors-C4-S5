import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext';

const NavBar = () => {

  const { setToken } = useAuth();
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between">
          <span className="display-6">CodeWarriors</span>
          <div className="d-flex">
            <Link className="btn btn-danger d-flex align-items-center"
              to="/auth/login"
              onClick={handleLogout}
            >
              <div className="me-2">
                Salir
              </div>
              <FontAwesomeIcon
                size="1x"
                className="icon"
                icon={faSignOutAlt} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar;
