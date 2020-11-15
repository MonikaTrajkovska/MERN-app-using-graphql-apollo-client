import React from "react";
import { compose } from "recompose";
import {
  getAuthorsQuery,
  addProjectMut,

  getProjectsQuery
} from "./../queries/queries";
import { graphql } from "react-apollo";
import HandleFormHook from "./../hooks/handleFormHook";

const AddCar = props => {
  const getFormData = () => {
    console.log(`${inputs}`);
    props.addProjectMut({
      variables: {
        name: inputs.name,
        description: inputs.description,
        // author: inputs.author,
        authorId: inputs.author
        // owner: inputs.owner
      },
      refetchQueries: [{ query: getProjectsQuery }]
    });
  };

  const { inputs, handleInputChange, handleSubmit } = HandleFormHook(
    getFormData
  );

  const getOwners = () => {
    var data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Owner loading...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    } //esle ends here
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Project name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={inputs.name}
          ></input>
        </div>
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></input>
        </div>
        {/* <div className="field">
        <label>Company:</label>
        <input
          type="text"
          name="company"
          onChange={handleInputChange}
          value={inputs.company}
        ></input>
      </div> */}
        <div className="field">
          <label>author:</label>
          <select
            name="author"
            onChange={handleInputChange}
            value={inputs.author}
          >
            <option>Select Owner</option>
            {getOwners(props)}
          </select>
        </div>
        <button>AddCar</button>
      </form>
    </>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addProjectMut, { name: "addProjectMut" })
)(AddCar);






