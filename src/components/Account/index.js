import React from 'react'
import PasswordChange from '../PasswordChange'
import { PasswordForgetLink } from '../PasswordForget'
import { withAuthorization,authUserContext} from '../Session'

const App = () => {
  return (
    <div>
      <center>
        <authUserContext.Consumer>
          {authuser=>(
            <div>
              <h1>Account:{authuser.email}</h1>
              </div>
)}
        </authUserContext.Consumer>
     
      </center>
    </div>
  )
}
const condition=authuser=>authuser!=null;
export default withAuthorization(condition)(App);
