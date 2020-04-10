const { GraphQLScalarType } = require('graphql')
const mutationResolvers = require('./mutationResolvers')
const photoResolvers = require('./photoResolvers')
const userResolvers = require('./userResolvers')
const queryResolvers = require('./queryResolvers')

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Photo: photoResolvers,
  User: userResolvers,
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Uma data válida',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value
  })
}

module.exports = resolvers