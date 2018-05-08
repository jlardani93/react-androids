import c from './../constants'

export default (state = {}, action) => {
  const { email }

  switch (action.types) {
    case c.SET_USER:
      let currentUser = Object.assign({}, state, {email: email});
      return currentUser;
    default:
      return state; 
  }
}

//CREATE_USER
//UPDATE_USER
//DELETE_USER
//SET_USER
