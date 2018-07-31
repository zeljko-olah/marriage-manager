const moment = require('moment')
const uuidv4 = require('uuid/v4')

var generateMessage = (from, text) => {
  return {
    id : uuidv4(),
    from,
    text,
    createdAt: moment().valueOf()
  }
}

module.exports = {
  generateMessage
}