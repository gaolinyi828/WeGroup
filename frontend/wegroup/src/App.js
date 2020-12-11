import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from "./components/Login";
import Signup from "./components/Signup";
import PostForm from "./components/PostForm";
import React from "react";
import UserProfile from "./containers/UserProfile";
import TabForm from "./components/TabForm";
import SideNav from "./components/SideNav";
import ActivityPage from "./containers/ActivityPage";
import CalendarPage from "./containers/CalendarPage";
import { Provider } from "react-redux";
import store from './store';
import PostDetailPage from "./containers/PostDetailPage";
import PostCreate from "./containers/PostCreate";

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
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
            <Route exact path="/activity">
              <ActivityPage />
            </Route>
            <Route exact path="/post_detail">
              <PostDetailPage />
            </Route>
            <Route exact path="/tab_form_search">
              <TabForm search={true}/>
            </Route>
            <Route exact path="/tab_form_create">
              <TabForm search={false}/>
            </Route>
            <Route exact path="/sidenav">
              <SideNav />
            </Route>
            <Route exact path="/create_post">
              <PostCreate/>
            </Route>
              <Route exact path="/calendar">
                  <CalendarPage />
              </Route>
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
