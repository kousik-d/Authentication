import React from 'react';

const FirebaseContext = React.createContext(null);
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase_instance => <Component {...props} firebase={firebase_instance} />}
    </FirebaseContext.Consumer>
  );

export default FirebaseContext;