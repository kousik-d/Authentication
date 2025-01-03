import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Firebase, { FirebaseContext } from './components/Firebase';
const firebase_instance=new Firebase()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<FirebaseContext.Provider value={firebase_instance}>
    <App />
  </FirebaseContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
