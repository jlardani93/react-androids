
import constants from './../constants'
import * as firebaseActions from './firebaseActions'
import * as userActions from './userActions'

export const addUser = firebaseActions.addUser;
export const removeUser = userActions.removeUser;
export const login = firebaseActions.login;
export const loginUser = userActions.loginUser;
