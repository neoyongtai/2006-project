import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar";
import ReportList from "./components/reportlist";
import EditReport from "./components/edit-report";
import CreateReport from "./components/create-report";
import CreateUser from "./components/create-user.js";
import Footer from "./components/footer.js";
import PostList from "./components/postlist";
import CreatePost from "./components/create-post";
import EditPost from "./components/edit-post"

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route path ="/" exact component = {ReportList} />
        <Route path ="/edit/:id" exact component = {EditReport} />
        <Route path ="/create" exact component = {CreateReport} />
        <Route path ="/user" exact component = {CreateUser} />
        <Route path ="/forum" exact component = {PostList} />
        <Route path ="/forum/createpost" exact component = {CreatePost} />
        <Route path ="/forum/edit/:id" exact component = {EditPost} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
