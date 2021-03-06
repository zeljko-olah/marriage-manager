const moment = require('moment')
const uuidv4 = require('uuid/v4')

var generateMessage = (from, text) => {
  return {
    _id : uuidv4(),
    from,
    text,
    type: 'message',
    createdAt: moment().valueOf()
  }
}

module.exports = {
  generateMessage
}