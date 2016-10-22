const request = require('request')

module.exports = (endpoint, callback) => {
  request.get(
    {
      url: `https://api.github.com${endpoint}`,
      json: true,
      headers: {
        'Authorization': 'token 0f85c1bac16a76d0eed90543fcb13330000c09e6',
        'User-Agent': 'BatataFrita'
      }
    },
    (err, response, body) => {
    callback(err, body)
  })
}
