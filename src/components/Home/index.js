import React from 'react'
import { withAuthorization } from '../Session';

const Home = () => {
  return (
    <div>
      <center>
      <h1>Welcome </h1>
      </center>
    </div>
  )
}
const condition=authuser=>authuser!=null;
export default withAuthorization(condition)(Home);
