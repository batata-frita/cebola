const github = require('./github')
const neo4j = require('./neo4j')
const log = require('./log')
const request = require('request')
const R = require('ramda')

// github('/users/cpapazaf', (err, body) => {
//   neo4j.createUser(body)
// })

const getRows = R.view(R.lensPath(['results', '0', 'data']))

const getUser = R.view(R.lensPath(['row', '0']))

const getNeo4JUsers = R.compose(R.map(getUser), getRows)

neo4j('MATCH (a:User) WHERE NOT ()-[:FOLLOWS]->(a) RETURN a LIMIT 10', (err, body) => {
  getNeo4JUsers(body).forEach((user) => {
    github(`/users/${user.handler}/followers`, (err, body) => {
      const queries = R.map(
        (follower) => [
          `CREATE (a:User { handler: '${follower.login}', id: '${follower.id}', avatar: '${follower.avatar_url}' })`,
          `MATCH (a:User { handler: '${follower.login}' }), (b:User { handler: '${user.handler}' }) CREATE (a)-[:FOLLOWS]->(b)`],
        body
      )

      R.unnest(queries).forEach(
        (query) => {
          // log(query)
          // return
          neo4j(query, (err, body) => {
            log(body)
          })
        }
      )
    })
  })
})
