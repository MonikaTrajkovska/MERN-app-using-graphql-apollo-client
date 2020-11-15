import { gql } from "apollo-boost";

const getProjectsQuery = gql` 
    {
        projects{
            name
            description
            id
        }
    }`
const DELETE_NOTE_QUERY = gql`
    mutation removeProject($id: String!) {
      removeProject(id:$id) {
     
       id
     
       
  
      }
    }
  `;



const addProjectMut = gql`
  mutation ($name: String!, $description:String!, $authorId:ID!) {
        addProject(name:$name, description:$description, authorId:$authorId) {
       
            name
  
              id
          
    }
  }
`
const getAuthorsQuery = gql` 
    {
        authors{
            name
            
            id
        }
    }`

const query = gql`
    query ($id:ID){
        project(id:$id){
            id
            name
            description
            author{
                name
                age
                id
                projects{
                    name
                    id
                }
            }
        }
    }
    
    `
export { getProjectsQuery, DELETE_NOTE_QUERY, query, getAuthorsQuery, addProjectMut };
