import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { query } from "../queries/queries";
import { useMutation, useQuery } from "react-apollo";
import { deleteHours } from "../queries/queries";

import '../components/CSS/ProjectDetails.css'
import { REMOVE_HOURS, } from '../queries/queries'




const ProjectDetails = props => {
  console.log(props.projectId.Id);


  // const [removeHours] = useMutation(deleteHours, {
  //   update(
  //     cache,
  //     {
  //       data: { removeHours }
  //     }
  //   ) {
  //     const { projects } = cache.readQuery({ query: getProjectsQuery });
  //     const newHours = projects.filter(project => project.hours !== removeHours.hours);

  //     cache.writeQuery({
  //       query: getProjectsQuery,
  //       data: { projects: newHours }
  //     });
  //   }
  // });

  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;




  const getProjectDetails = () => {
    const { project } = props.data
    console.log(project);
    if (project) {
      return (

        <div id="pop-up" className="delete">
          <div id="delete-container">
            <div id="delete-text">
              <h2>Name : {project.name}</h2>
              <div>
                <p>Description: {project.description}</p>
                <p>Hours: {project.hours}</p>
              </div>







              {/* <p onClick={e => {
            e.preventDefault();
            removeHours({ variables: { hours: project.hours } });
            //notify.show("Note was deleted successfully", "success");
          }}>Hours : {project.hours} </p> */}
              <p>Author : {project.author.name}</p>
              <p>All projects by {project.author.name} :</p>
              <ul>
                {project.author.projects.map(item => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>
              <Link to="/list">X</Link>
            </div >
          </div>
        </div>
      );
    } else {
      return <div>No Project Selected</div>;
    }
  };

  return <div>{getProjectDetails()}</div>;

};

export default graphql(query, {
  options: props => {
    return {
      variables: {
        id: props.projectId.Id
      }
    };
  }
})(ProjectDetails);
