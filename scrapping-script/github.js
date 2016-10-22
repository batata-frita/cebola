const request = require('request')
const config = require('./config')
const log = require('./log')

const github = (endpoint, callback) => {
  request.get(
    {
      url: `https://api.github.com${endpoint}`,
      json: true,
      headers: {
        'Authorization': `token ${config.token}`,
        'User-Agent': 'BatataFrita'
      }
    },
    (err, response, body) => {
      const links = getLinks(response)
      callback(
        err, body,
        links && links[0] !== links[1]
          ? links
          : undefined
      )
  })
}

github.following = (handler, callback, extras) => {
  github(`/users/${handler}/following${extras || ''}`, (err, body, next) => {
    callback(err, body)

    if (next) {
      log('DATASET INCOMPLETE FOR ' + handler)
      log(next)
      log('CONTINUING')
      github.following(handler, callback, '?' + next[0].split('?')[1])
    }
  })
}

module.exports = github

const getLinks = (response) => response.headers.link &&
  [
  response.headers.link.split(',')[0].split(';')[0].slice(1, -1),
  response.headers.link.split(',')[1].split(';')[0].slice(2, -1)
]
