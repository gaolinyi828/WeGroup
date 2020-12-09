import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import PostForm from "./components/PostForm";
import React from "react";
import UserProfile from "./containers/UserProfile";
import TabForm from "./components/TabForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/post_form">
          <PostForm/>
         </Route>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
        <Route exact path="/tab_form_search">
          <TabForm search={true}/>
        </Route>
        <Route exact path="/tab_form_create">
          <TabForm search={false}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
