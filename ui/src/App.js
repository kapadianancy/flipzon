import React from 'react';
import Admin from './admin/Admin';
import User from './user/User';
import {Route,Switch} from 'react-router-dom';


function App() {
  return (
    <>
    <Switch>
      <Route path="/admin" component={Admin}/>
      <Route path="/" component ={User}/>
    </Switch>
    
    </>
  );
}

export default App;
