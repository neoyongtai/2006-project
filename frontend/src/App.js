import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar";
import ReportList from "./components/reportlist";
import EditReport from "./components/edit-report";
import CreateUser from "./components/create-user";
import Footer from "./components/footer";
import PostList from "./components/postlist";
import CreatePost from "./components/create-post";
import EditPost from "./components/edit-post";
import ViewPost from "./components/post";
import EditComment from "./components/edit-comment";
import HomePage from "./components/home-page";
import ReportView from"./components/report-view"
import ReportMaps from "./components/report-maps"
import ReportPage from "./components/reportpage";
import SignIn from "./components/login";
import Profile from "./components/profile";

function App() {

  return (
    <div>
      <Router>
        <Route exact component= {Navbar} />
        <Route path ="/" exact component= {HomePage}/>

        <Route path ="/report" exact component = {ReportList} />
        <Route path = "/report/sum/:id" exact component = {ReportView}/>
        <Route path ="/report/edit/:id" exact component = {EditReport} />
        <Route path ="/report/create" exact component = {ReportPage} />
        <Route path ="/report/map" exact component = {ReportMaps} />
        <Route path ="/user" exact component = {CreateUser} />

        <Route path ="/user/:id" exact component = {Profile} />
        <Route path ="/login" exact component = {SignIn} />

        <Route path ="/forum" exact component = {PostList} />
        <Route path ="/forum/create/:id" exact component = {CreatePost} />
        <Route path ="/forum/edit/:id" exact component = {EditPost} />
        <Route path ="/forum/view/:id" exact component = {ViewPost} />
        <Route path ="/forum/comment/edit/:id" exact component = {EditComment} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
