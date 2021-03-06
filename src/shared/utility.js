// UPDATE OBJECT UTILITY - UPDATE STATE OBJECT IMMUTABLY
export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  }
}

// VALIDATE FORM
export const validateForm = (email, password) => {
  // Check if fields are empty
  if (!email.trim() || !password.trim()) {
    return 'Type something...'
    }

  //  Test email
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const isEmail = pattern.test( email )

  if ( !isEmail ) {
    return 'Email not valid'
  }

  return null
}

// GEOLOCATION GET COORDINATES - EXAMPLE WITH CALLBACK
export const getCoordsCallback = (callback) => {
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position){
    callback(position)
  }, function () {
    alert('Unable to fetch location.')
  })
}

// CLEAR FORM
export const clearForm = (form, roomUsers) => {
  const { email, password, title, description, priority } = form
  if (email) {
    email.value = ''
  }
  if (password) {
    password.value = ''
  }
  if (title) {
    title.value = ''
  }
  if (description) {
    description.value = ''
  }
  if (form[roomUsers[0]].checked) {
    form[roomUsers[0]].checked = false
  }
  if (form[roomUsers[1]].checked) {
    form[roomUsers[1]].checked = false
  }
  if (priority) {
    priority.value = 'normal'
  }
}

// GEOLOCATION GET COORDINATES - EXAMPLE WITH PROMISES
export const getCoordsPromise = () => {
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function (position){
      resolve(position)
    }, function () {
      reject('Unable to fetch location.')
    })
  })

}