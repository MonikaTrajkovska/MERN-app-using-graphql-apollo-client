import React from "react";
import { graphql } from "react-apollo";
import { query } from "./../queries/queries";

const CarDetails = props => {
  console.log(props.projectId.Id);

  const getCarDetails = () => {
    const { project } = props.data;
    console.log(project);
    if (project) {
      return (
        <div>
          <h2>{project.name}</h2>
          <p>model : {project.description}</p>
          {/* <p>company : {car.company}</p>
          <p>owner : {car.owner.name}</p> */}
          <p>All cars by this owner :</p>
          <ul>
            {project.author.projects.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Car Selected</div>;
    }
  };

  return <div id="carDetails">{getCarDetails()}</div>;
};

export default graphql(query, {
  options: props => {
    return {
      variables: {
        id: props.projectId.Id
      }
    };
  }
})(CarDetails);
