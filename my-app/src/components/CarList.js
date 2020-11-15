import React from "react";
import { graphql, useMutation, useQuery } from "react-apollo";
import { getProjectsQuery, DELETE_NOTE_QUERY } from "./../queries/queries";
import CarDetails from "./CarDetails";

const CarList = props => {
  console.log(props);
  const [Id, setCar] = React.useState(0);
  const { loading, error, data } = useQuery(getProjectsQuery);
  const [removeProject] = useMutation(DELETE_NOTE_QUERY, {
    //  refetchQueries: muatationResult => [{ query: getProjectsQuery }]
    update(
      cache,
      {
        data: { removeProject }
      }
    ) {


      const { projects } = cache.readQuery({ query: getProjectsQuery });
      const newProject = projects.filter(project => project.id !== removeProject.id);

      cache.writeQuery({
        query: getProjectsQuery,
        data: { projects: newProject }
      });
    }
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;







  const displayCars = () => {
    var data = props.data;
    if (data.loading) {
      return <div>Loading Cars...</div>;
    } else {
      return data.projects.map(project => {
        return (
          <li key={project.id} onClick={e => setCar({ Id: project.id })}>
            {project.name}
            {project.description}
            <button
              onClick={e => {
                e.preventDefault();
                removeProject({ variables: { id: project.id } });
                //notify.show("Note was deleted successfully", "success");
              }}
              className="card-footer-item"
            >
              Delete
                  </button>
          </li>
        );
      });
    }
  };

  return (
    <>
      <ul id="carList">{displayCars()}</ul>
      <CarDetails projectId={Id}></CarDetails>
    </>
  );
};

export default graphql(getProjectsQuery)(CarList);
