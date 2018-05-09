import Firebase from 'firebase';
import constants from './../constants';
import * as actions from './userActions.js'
const { firebaseConfig } = constants;

firebase.initializeApp(firebaseConfig);
const users = firebase.database().ref('users');

//CREATES A NEW USER IN THE FIREBASE DATABASE
export function addUser(_email, _password, _name){
  console.log('trying to add user');
  return (dispatch) => users.push({
    email: _email,
    password: _password,
    name: _name
  })
  .then(userId => getUser(userId))
  .then(snapshot => {
    console.log('trying to read snapshot');
    console.log(snapshot.key)
    dispatch(actions.loginUser(snapshot.key, snapshot.val().email, snapshot.val().name))
  })
}

//GETS A USER BY USERID AFTER A NEW USER HAS BEEN ADDED TO THE FIREBASE
export function getUser(_userId){
  console.log(_userId);
  return _userId.once('value');
}

//CHECKS TO SEE IF A USER WITH THE GIVEN EMAIL AND PASSWORD EXISTS IN THE DATABASE AND THEN RECEIVES THAT INFORMATION
export function login(_email, _password){
  let loggedInUser = null;
  let userKey = null;
  console.log('trying to login');
  return (dispatch) => users.orderByChild('email').equalTo(_email).once('value')
  .then(snapshot => {
    if (snapshot.val()) {
      const userKeys = Object.keys(snapshot.val());
      const userValues = Object.values(snapshot.val());
      for (let i = 0; i < userValues.length; i++) {
        if (userValues[i].password === _password) {
          loggedInUser = Object.create(snapshot.val()[userKeys[i]]);
          userKey = userKeys[i];
        }
      }
    }
    if (loggedInUser){
      dispatch(actions.loginUser(userKey, loggedInUser.email, loggedInUser.name))
    } else {
      alert("The e-mail or password you entered was incorrect. Please try again");
    }
  })
}
