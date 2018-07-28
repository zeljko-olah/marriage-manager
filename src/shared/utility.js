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