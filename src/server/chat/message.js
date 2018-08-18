const moment = require('moment')
const uuidv4 = require('uuid/v4')

var generateMessage = (from, text, unread, type) => {
  return {
    _id : uuidv4(),
    from,
    text,
    createdAt: moment().valueOf(),
    unread,
    type
  }
}

module.exports = {
  generateMessage
}