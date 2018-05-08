import * as types from './../constants/ActionTypes'

export const setUser = (snapshot) => {
  return {
    type: c.SET_USER,
    email: snapshot.email
  }
}
