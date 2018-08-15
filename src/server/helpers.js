const moment = require('moment')

const formatMessageTime = (timestamp) => {
  
  const messageTime = moment(timestamp)
  const yesterday = moment().subtract(1, 'days')
  const week = moment().subtract(7, 'days')
  const month = moment().subtract(1, 'months') 

  if (messageTime.valueOf() < month.valueOf()) {
    return messageTime.fromNow()
  } 

  if (messageTime.valueOf() < week.valueOf()) {
    return moment(messageTime).format('MMM DD, h:mm a')
  }

  if (messageTime.valueOf() < yesterday.valueOf()) {
    return moment(messageTime).format('ddd, h:mm a')
  }

  return messageTime.fromNow()
}

module.exports = {
  formatMessageTime
}