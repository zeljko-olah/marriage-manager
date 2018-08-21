const moment = require('moment')
const request = require('request')

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

const getAddressFromCoords = (lat, lng) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDw-v2qMe3SY_AQcfMFYrNu2P4L1H8Z0vc`
  let address = ''

  return new Promise((resolve, reject) => {
    request({
      url,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject(error)
      } else if (response.statusCode === 200) {
        address = body.results[0].formatted_address
        resolve(address)
      }
    })
  })
}

module.exports = {
  formatMessageTime,
  getAddressFromCoords
}