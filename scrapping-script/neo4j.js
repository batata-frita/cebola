const request = require('request')
const config = require('./config')
const util = require('util')

const neo4j = (query, callback) => {
  request.post({
    url: `${config.origin}${config.endpoint}`,
    auth: {
      user: 'neo4j',
      password: 'batata-frita'
    },
    json: {
      "statements" : [
        {
          "statement" : query
        }
      ]
    }
  }, (err, response, body) => {
    callback(err, body)
  })
}

neo4j.createUser = ({login, avatar_url, id}) => {
  neo4j(
    `CREATE (x:User { handler: '${login}', id: '${id}', avatar: '${avatar_url}' })`,
    (err, body) => {
      console.log('CREATED', util.inspect(body, { showHidden: true, depth: null }))
    })
}

module.exports = neo4j
