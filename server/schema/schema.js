const graphql = require('graphql')
//const _ = require('lodash')
const Project = require('../models/project')
const Author = require('../models/author')

const { GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;


const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // if (parent.authorId) {
        //     return Author.findById(parent.authorId)
        // } else {
        //     return null
        // }
        return Author.findById(parent.authorId)
        //console.log(parent)
        //return _.find(authors, { id: parent.authorId })
      }
    }
  })
})
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },

    age: { type: GraphQLInt },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({ authorId: parent.id })
        // return _.filter(projects, { authorId: parent.id })
      }
    }

  })
})
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id)
        // return _.find(projects, { id: args.id });
        //code to get data from db
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id)
        // return _.find(authors, { id: args.id })
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({})
        // return projects
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({})
        // return authors
      }
    }

  }
})
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        //authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save()

      }
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let project = new Project({
          name: args.name,
          description: args.description,
          authorId: args.authorId
        })
        return project.save()
      }
    },

    removeProject: {
      type: ProjectType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        const remBook = Project.findByIdAndRemove(args.id).exec();
        if (!remBook) {
          throw new Error('Error')
        }
        return remBook;
      }
    }
    // deleteProject: {
    //     type: ProjectType,
    //     args: {
    //         id: { type: new GraphQLNonNull(GraphQLID) }
    //     },
    //     resolve(parent, args) {
    //         let project = new Project()
    //         return project.findOneAndRemove({ _id: args.id })
    //     }
    // }



  }


})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})