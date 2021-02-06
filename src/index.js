
import React, { useReducer, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch, useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './bootstrap.css';
import './style.css';

import {
  Signin,
  GetPosts,
  AddPost,
  DeletePost,
  UserProfile,
  MessageForm,
  MessageList,
  // EditPost,
} from './components';

const App =  () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([])
  
  return <>
   <nav className="navbar">
      <div>{user.username}</div>
        <h3>Strangers Things</h3>
        <Link to="/">Home</Link>
        <Link to="/login">Sign In</Link>
        <Link to="/addposts">Add a Post</Link>
        <Link to="/users/me">User Profile</Link>
        <Link to="/messages">Messages List</Link>
   </nav>
   
    <Route exact path="/">
        <GetPosts setPosts={setPosts} posts={posts} token={token} setToken={setToken}/>
    </Route>

    <Route path="/register">
        <Signin type={'register'} setToken={setToken} token={token} setUser={setUser}/>
     </Route>

    <Route path="/login">
        <Signin type={'login'} setToken={setToken} setUser={setUser}/>
    </Route>

    <Route path="/addposts">
        <AddPost setPosts={setPosts} token={token} posts={posts} user={user} setUser={user}/>
    </Route>
    {/* <Route path="/delete">
        <DeletePost setPosts={setPosts} postList={postList} token={token} posts={posts}/>
    </Route> */}
   
    
    

    <Route path='/users/me'>
        <UserProfile setUser={setUser} setPosts={setPosts} token={token} posts={posts}/>
    </Route>
  
    
    <Route path='/messages'>
      <MessageList token={token} setUser={setUser} messages={messages} setMessages={setMessages}/>
     </Route>
   
    {/* <Route path='/'>
        <EditPost/>
    </Route> */}
  </>
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app'),
);

