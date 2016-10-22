const util = require('util')

module.exports = (param) =>
  console.log(util.inspect(param, { showHidden: true, depth: null }))
