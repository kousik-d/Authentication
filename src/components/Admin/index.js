import React, { useEffect, useState } from 'react';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import { onValue } from 'firebase/database';

const Initial_State = {
  loading: true, // Changed to true since data is being fetched
  users: [],     // Changed to "users" to match your state usage
};

const Admin = ({ firebase }) => {
  const [state, setState] = useState(Initial_State);

  useEffect(() => {
    // Get the reference to the users node in the database
    const usersRef = firebase.users();

    // Use onValue to listen to changes in the database
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersObject = snapshot.val();

      // Convert the object to a list
      if (usersObject) {
        const usersList = Object.keys(usersObject).map((key) => ({
          ...usersObject[key],
          uid: key,
        }));

        setState({ users: usersList, loading: false });
      } else {
        setState({ users: [], loading: false });
      }
    });

    // Cleanup the listener when component unmounts
    return () => {
      unsubscribe(); // Detaches the listener
    };
  }, [firebase]);

  const { users, loading } = state; // Destructure 'users' and 'loading' correctly

  return (
    <div>
      <center>
        <h1>Admin</h1>
        {loading && <p>Loading...</p>}
        {!loading && users.length > 0 && <UserList users={users} />}
        {users.length === 0 && <p>No users found</p>}
      </center>
    </div>
  );
};

// Correctly renamed to UserList and added return inside the map function
const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  );
};

// Authorization condition for admin users
const condition = (authUser) => authUser && authUser.roles.includes(ROLES.ADMIN);

export default withFirebase(Admin);
