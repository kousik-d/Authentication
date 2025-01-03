import React, { useEffect, useState } from 'react'
import { withFirebase } from '../Firebase';
import {authUserContext} from '../Session';
const WithUserAuthentication = (Component) => {
 const WithAuthentication = ({firebase,...props}) => {
    const[authUser,setAuthUser]=useState(null);
    useEffect(()=>{
        const  unsubscribe=firebase.auth.onAuthStateChanged(authUser => {
        setAuthUser(authUser ? authUser : null);
        });
        return()=>{unsubscribe()};}
        ,[firebase])
   return (
    <authUserContext.Provider value={authUser}>
       <Component {...props}/>
    </authUserContext.Provider>
   )
 }
 return withFirebase(WithAuthentication);
 
}

export default WithUserAuthentication;
