import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import LoadingSpinner from './LoadingSpinner'; // Ensure this is correctly imported

const PasswordForget = () => {
  return (
    <div>
      <center>
        <PasswordForgetForm />
      </center>
    </div>
  );
};

const Initial_State = {
  email: '',
  error: null,
  isLoading: false,
};

const PasswordForgetFormBase = ({ firebase }) => {
  const [password, setPassword] = useState(Initial_State);

  const onChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setPassword((prevState) => ({ ...prevState, isLoading: true }));

    const { email } = password;
    try {
      const userExists = await firebase.checkUserExists(email);

      if (userExists) {
        await firebase.sendResetEmail(email);
        alert('Email Sent Successfully');
      } else {
        alert('Username does not exist. Please sign up.');
      }
    } catch (error) {
      setPassword((prevState) => ({ ...prevState, error }));
    } finally {
      setPassword((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  const { email, error, isLoading } = password;
  const isInvalid = email === '';

  return (
    <div className={isLoading ? 'loading-overlay' : ''}> 
    {isLoading && ( 
        <div className="loading-overlay"> 
          <LoadingSpinner /> 
        </div> )} 
        
      <div className="container">
        <h1>Forgot Password</h1>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" disabled={isInvalid}>
            Submit
          </button>
        </form>
        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
};

const PasswordForgetLink = () => (
  <Link to={ROUTES.PASSWORD_FORGET}>Forgot password</Link>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetLink, PasswordForgetForm };
export default PasswordForget;
