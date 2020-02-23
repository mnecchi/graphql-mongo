const { buildSchema } = require('graphql');

const schema = buildSchema(`
	type Query {
		course(id: ID!): Course
		courses: [Course]
	},

	type Mutation {
		createCourse(title: String!, author: String!, description: String, topic: String, url: String): Course
		updateCourse(id: ID!, title: String, author: String, description: String, topic: String, url: String): Course
		deleteCourse(id: ID!): Course
	},

	type Course {
		id: ID!
		title: String!
		author: String!
		description: String
		topic: String
		url: String
	}
`);

module.exports = schema;
