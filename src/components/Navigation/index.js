import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import SignOut from '../SignOut';
import {authUserContext} from '../Session';
import './navigation.css';

const Navigation = () => {
  return (
    <div>
      <authUserContext.Consumer>
        {
          authUser=>authUser?<NavigationAuth/>:<NavigationNonAuth/>
        }
      </authUserContext.Consumer>
    </div>
  )
}
const NavigationAuth = () => (
  <nav className="navbar">
    <div className="navbar-logo">Housing</div>
    <ul className="navbar-links">
      <li>
        <Link to={ROUTES.LANDING} className="nav-link">Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME} className="nav-link">Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT} className="nav-link">Account</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_OUT} className="nav-link">Sign Out</Link>
      </li>
    </ul>
  </nav>
);
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation
