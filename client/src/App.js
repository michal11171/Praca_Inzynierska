import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import Profiles from './components/profiles/Profiles';
import BannedProfiles from './components/profiles/BannedProfiles';
import Profile from './components/profile/Profile';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import PostsO from './components/posts/PostsO';
import PostsF from './components/posts/PostsF';
import PostsR from './components/posts/PostsR';
import 'semantic-ui-css/semantic.min.css';
import Groups from './components/groups/Group';
import AddGroup from './components/groups/AddGroup';
import EditGroup from './components/groups/EditGroup';
import Threads from './components/messages/Threads';
import Messages from './components/messages/Messages';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/profiles' component={Profiles} />
              <PrivateRoute exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/bannedprofiles' component={BannedProfiles} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/threads' component={Threads} />
              <PrivateRoute exact path='/postsO' component={PostsO} />
              <PrivateRoute exact path='/postsF' component={PostsF} />
              <PrivateRoute exact path='/postsR' component={PostsR} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
              <PrivateRoute exact path='/groups' component={Groups} />
              <PrivateRoute exact path='/add-group' component={AddGroup} />
              <PrivateRoute exact path='/edit-group/:id' component={EditGroup} />
              <PrivateRoute exact path='/profile/:id/message' component={Messages} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
