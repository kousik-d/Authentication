import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import SignOut from '../SignOut';
import {authUserContext} from '../Session';

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
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_OUT}>Sign Out</Link>
    </li>
  </ul>
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
