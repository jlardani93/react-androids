import Firebase from 'firebase';
import constants from './../constants';
const { firebaseConfig } = constants;

firebase.initializeApp(firebaseConfig);
const users = firebase.database().ref('users');

export function addUser(_email, _password){
  return () => users.push({
    email: _email,
    password: _password
  })
  .then(userId => getUser(userId)
  .then(snapshot => setUser(snapshot)
  ))
}

export function getUser(_userId){
  return users.ref(_userId).once('value');
}
