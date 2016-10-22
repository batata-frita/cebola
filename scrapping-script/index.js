const github = require('./github')
const neo4j = require('./neo4j')
const log = require('./log')
const request = require('request')
const every = require('async/every')
const R = require('ramda')

// github('/users/cpapazaf', (err, body) => {
//   neo4j.createUser(body)
// })

const getRows = R.view(R.lensPath(['results', '0', 'data']))

const getUser = R.view(R.lensPath(['row', '0']))

const getNeo4JUsers = R.compose(R.map(getUser), getRows)

neo4j('MATCH (a:User) WHERE NOT (a)-[:FOLLOWS]->() RETURN a LIMIT 100', body => {
  getNeo4JUsers(body).forEach((user) => {
    github.following(user.handler, (err, body) => {
      const statements = R.compose(
        R.map(following => ({
          user: neo4j.createUser(following),
          follows: neo4j.follows(user.handler, following.login)
        }))
      )(body)

      every(statements, (statement, callback) => {
        neo4j(statement.user, body => {
          log(body)
          callback(null, true)
        })
      }, () => {
        neo4j(statements.map(s => s.follows), body => {
          log(body)
        })
      })
    })
  })
})
