import React, { useState } from 'react'
import { withFirebase } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
const Initial_State={
  passwordone:'',
  passwordtwo:'',
  error:null
  
}
const PasswordChange = ({firebase}) => {
  const navigate=useNavigate();
  const[updatepassword,setUpdatepassword]=useState(Initial_State);
  const onchage=(event)=>
  {
    setUpdatepassword({...updatepassword,[event.target.name]:event.target.value});
  }
  const onsubmit=(event)=>
  {
    const{passwordone}=updatepassword;
    event.preventDefault();
    firebase.doPasswordUpdate(passwordone).then(setUpdatepassword(Initial_State),
                                                navigate(ROUTES.HOME)
                                               )
                                           .catch(error=>setUpdatepassword({error}));
  }
  
  const{passwordone,passwordtwo}=updatepassword;
  const invalid=passwordone !== passwordtwo || passwordone==='';
  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={onsubmit}>
        <input name='passwordone' value={passwordone} placeholder='Password' type='password' onChange={onchage}
        />
        <input name='passwordtwo' value={passwordtwo} placeholder='Confirm password' type='password' onChange={onchage}
        />
        <button type='submit' disabled={invalid} >Submit</button>
      </form>
    </div>
  )
}

export default withFirebase(PasswordChange);
