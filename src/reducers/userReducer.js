import constants from './../constants/index.js'

export default (state = {}, action) => {
  const { userKey, email, name } = action;
  const { c } = constants
  let currentUser;
  switch (action.type) {
    case c.REMOVE_USER:
      currentUser = Object.assign({}, state, {email: null, name: null, userKey: null});
      localStorage['androidsReduxStore'] = {};
      return currentUser;
    case c.LOGIN_USER:
      const userData = {
        userKey: userKey,
        email: email,
        name: name
      }
      currentUser = Object.assign({}, state, userData);
      localStorage['androidsReduxStore'] = JSON.stringify(userData);
      console.log(localStorage['androidsReduxStore']);
      return currentUser;
    default:
      return state;
  }
}

//CREATE_USER
//UPDATE_USER
//DELETE_USER
//SET_USER
