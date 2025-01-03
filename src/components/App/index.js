import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navigation from '../Navigation';
import Landing from '../Landing';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import PasswordForget from '../PasswordForget';
import Home from '../Home';
import Account from '../Account';
import Admin from '../Admin';


import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import {  WithUserAuthentication } from '../Session';
import SignOut from '../SignOut';

const App = ({firebase}) => {
  return (
    
    <Router>
      <div>
      <Navigation/>
      <hr />
      <Routes>
          <Route exact path={ROUTES.LANDING} element={<Landing />} />
          <Route exact path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route exact path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route exact path={ROUTES.PASSWORD_FORGET} element={<PasswordForget />} />
          <Route exact path={ROUTES.HOME} element={<Home />} />
          <Route exact path={ROUTES.ACCOUNT} element={<Account />} />
          <Route exact path={ROUTES.ADMIN} element={<Admin />} />
          <Route exact path={ROUTES.SIGN_OUT} element={<SignOut/>}/>
      </Routes>
      </div>
    </Router>
   
    
    
  )
}


export default  WithUserAuthentication(App);
