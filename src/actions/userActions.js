import constants from './../constants'
const { c } = constants;

export const setUser = (snapshot) => {
  return {
    type: c.SET_USER,
    email: snapshot.val().email
  }
}

export const removeUser = () => {
  return {
    type: c.REMOVE_USER
  }
}

export const loginUser = (userKey, userEmail, name) => {
  return {
    type: c.LOGIN_USER,
    userKey: userKey,
    email: userEmail,
    name: name
  }
}
