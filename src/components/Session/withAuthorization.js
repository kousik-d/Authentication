import React, { useEffect } from 'react'
import { withFirebase } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import authUserContext from './context';
const withAuthorization = (condition) =>Component=> {
    
    const WithAuthorization=({firebase,...props})=>
    {
        const navigate=useNavigate();
        useEffect(()=>
            {
                const listner=firebase.auth.onAuthStateChanged(
                    authuser=>{
                        if(!condition(authuser))
                        {
                            navigate(ROUTES.SIGN_IN);
                        }
                    }
                );
                return () => listner();
            },[firebase]);
        return(
            <div>
                <authUserContext.Consumer >
                 { authuser =>condition(authuser) ?<Component {...props}/>:null}
                </authUserContext.Consumer>
            </div>
        )
    }
    return withFirebase(WithAuthorization);
}
export default withAuthorization;
