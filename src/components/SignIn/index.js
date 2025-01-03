import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';
import './SignIn.css';

const SignIn = () => (
  <div className="signi-container">
    <SignInForm />
  </div>
);

const SignInFormBase = ({ firebase }) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook

  const onSubmit = (event) => {
    event.preventDefault();
    firebase
      .doSignInWithEmailAndPassword(userName, password)
      .then(() => {
        setError(null); // Clear error
        navigate(ROUTES.HOME); // Redirect on success
      })
      .catch((err) => {
        alert("Invalid Email ID or Password"); // Friendly error
      });
  };

  const isInvalid = password === '' || userName === '';

  return (
    
    <div className="container">
      <p className="signin-header">Sign In</p>
      <form onSubmit={onSubmit}>
        {/* Username Input */}
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

         <div className="links-container">
      <SignUpLink />
      <PasswordForgetLink />
    </div> 

        {/* Error Display */}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

const SignInForm = withFirebase(SignInFormBase);

export default SignIn;
export { SignInForm };
