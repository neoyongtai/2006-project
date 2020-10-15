import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar";
import ReportList from "./components/reportlist"
import EditReport from "./components/edit-report"
import CreateReport from "./components/create-report"
import CreateUser from "./components/create-user.js"

function App() {
  return (
    <Router> 
    
    <Navbar />
    <br/>
    <Route path ="/" exact component = {ReportList} />
    <Route path ="/edit/:id" exact component = {EditReport} />
    <Route path ="/create" exact component = {CreateReport} />
    <Route path ="/user" exact component = {CreateUser} />
    </Router>
  );
}

export default App;
