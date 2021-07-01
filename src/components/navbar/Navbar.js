import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logout, login } from "../../redux-store/actions/firebaseActions";
import { authHandler } from "../../utils/firebase";
import { connect } from "react-redux";
import { useEffect } from "react";

function Navbar({ user, logout, login }) {
  useEffect(() => {
    if (!user) {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        login(savedUser);
      }
    }
  }, [user, login]);
  const history = useHistory();
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Product Minia
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            {!user && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/sign-up' exact={true}>
                    Sign up
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login' exact={true}>
                    Login
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li className='nav-item'>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    authHandler.signout().then(() => {
                      logout();
                      history.push("/login");
                    });
                  }}
                  className='nav-link'
                  to='/login'
                  exact={true}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ firebase: { user } }) => {
  return {
    user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (payload) => dispatch(login(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
