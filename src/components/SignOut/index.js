import React, { useContext } from 'react';
import { withFirebase } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { authUserContext } from '../Session';

const SignOut = ({ firebase }) => {
  const navigate = useNavigate();
  const authUser = useContext(authUserContext);

  const onSignOut = () => {
    if (authUser) {
      console.log(`Signing out user: ${authUser.email}`);
    }
    firebase.doSignOut();
    navigate(ROUTES.SIGN_IN);
  };

  return (
    <div style={styles.container}>
      {authUser ? (
        <div style={styles.card}>
          <h1 style={styles.heading}>Account Details</h1>
          <p style={styles.email}>Email: {authUser.email}</p>
          <button style={styles.signOutButton} onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <p style={styles.message}>No user is signed in.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '10px',
    color: '#333',
  },
  email: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px',
  },
  signOutButton: {
    backgroundColor: '#ff4b5c',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  signOutButtonHover: {
    backgroundColor: '#ff1e3c',
  },
  message: {
    fontSize: '1rem',
    color: '#777',
  },
};

export default withFirebase(SignOut);
