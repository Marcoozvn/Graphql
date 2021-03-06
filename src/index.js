const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { readFileSync } = require('fs')
const { MongoClient } = require('mongodb')
require('dotenv').config()

const typeDefs = readFileSync('./src/typeDefs.graphql', 'UTF-8')
const resolvers = require('./resolvers')

async function start() {
  
  const MONGO_DB = process.env.DB_HOST

  const client = await MongoClient.connect(MONGO_DB, { useNewUrlParser: true })
  const db = client.db()

  const app = express()
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: async ({ req }) => {
      const githubToken = req.headers.authorization
      const currentUser = await db.collection('users').findOne({ githubToken })
      
      return { db, currentUser }
    } 
  })

  server.applyMiddleware({ app })
  
  app.get('/', (req, res) => res.end('Hello world'))
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
  
  app.listen({ port: 4000 }, () => console.log(`Graphql server rodando na http://localhost:4000${server.graphqlPath}`))
}

start()
