
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject";
import EditProject from './components/EditProject'
import ProjectDetails from "./components/ProjectDetails";
//import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>


          <div >
            <Link to="/list">
              All Projects
            </Link>

            <Link to="/newproject">
              New Project
            </Link>
          </div>
        </nav>

        <Route exact path="/list" component={ProjectList} />
        <Route path="/newproject" component={AddProject} />
        <Route path="/project/:id" component={EditProject} />
        <Route path="/detail/:id" component={ProjectDetails} />
      </div>
    </Router>
  );
}

export default App;
