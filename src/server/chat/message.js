const moment = require('moment')
const uuidv4 = require('uuid/v4')

var generateMessage = (from, text, unread) => {
  return {
    id : uuidv4(),
    from,
    text,
    createdAt: moment().valueOf(),
    unread 
  }
}

module.exports = {
  generateMessage
}