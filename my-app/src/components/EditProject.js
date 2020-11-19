import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { notify } from "react-notify-toast";
import gql from "graphql-tag";
import { UPDATE_PROJECT, query } from '../queries/queries'



const EditProject = ({ match }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [hours, setHours] = useState("")


    const { loading, error, data } = useQuery(query, {
        variables: {
            id: match.params.id
        }
    });

    const [updateProject] = useMutation(UPDATE_PROJECT);

    if (loading) return <div>Fetching projects</div>;
    if (error) return <div>Error fetching projects</div>;
    const project = data;
    console.log(project)
    return (
        <div>
            <h1>Edit Project</h1>

            <div>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        updateProject({
                            variables: {
                                id: project.project.id,
                                name: name ? name : project.project.name,
                                description: description ? description : project.project.description,
                                hours: hours ? hours : project.project.hours
                            }
                        });
                        console.log(project.project.id)
                        notify.show("Project was edited successfully", "success");
                    }}

                >
                    <div>
                        <label>Project Name</label>
                        <div>
                            <input
                                className="input"
                                type="text"
                                name="title"
                                placeholder="Project Name"
                                defaultValue={project.project.name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div >
                            <label>Project Description</label>
                            <input
                                className="input"
                                type="text"
                                name="description"
                                placeholder="Project Description"
                                defaultValue={project.project.description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Hours</label>
                            <input
                                className="input"
                                type="text"
                                name="hours"
                                placeholder="Hours"
                                defaultValue={project.project.hours}
                                onChange={e => setHours(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProject;
