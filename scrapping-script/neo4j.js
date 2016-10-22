const request = require('request')
const config = require('./config')
const log = require('./log')

const neo4j = (query, callback) => {
  request.post({
    url: `${config.origin}${config.endpoint}`,
    auth: {
      user: 'neo4j',
      password: 'batata-frita'
    },
    json: {
      "statements" : query instanceof Array
        ? query.map(s => ({'statement': s}))
        : [
          {
            "statement" : query
          }
        ]
    }
  }, (err, response, body) => {
    if (err) {
      throw err
    }
    callback(body)
  })
}

neo4j.createUser = ({login, id, avatar_url}) => `CREATE (x:User { handler: '${login}', id: '${id}', avatar: '${avatar_url}' })`

neo4j.follows = (a, b) => `MATCH (a:User { handler: '${a}' }), (b:User { handler: '${b}' }) CREATE (a)-[:FOLLOWS]->(b)`

module.exports = neo4j
