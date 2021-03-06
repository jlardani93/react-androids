import React from 'react';
import PropTypes from 'prop-types';
import * as actions from './../actions/index.js';
import { connect } from 'react-redux';

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showRegistrationForm: false
    }
    this.handleShowRegistration = this.handleShowRegistration.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  _email: null;
  _password: null;
  _name: null;

  handleRegistration(){
    const { dispatch } = this.props;
    const redirectCallback = (() => {
      console.log(this.props);
      this.props.history.push('/userinfo');
    }).bind(this);
    dispatch(actions.addUser(this._email.value, this._password.value, this._name.value, redirectCallback));
    this._email.value = '';
    this._password.value = '';
    this._name.value = '';
    if (this.props.currentUserEmail) this.props.history.push('/userinfo');
  }

  handleLogin(){
    const { dispatch } = this.props;
    const redirectCallback = (() => {
      console.log(this.props);
      this.props.history.push('/userinfo');
    }).bind(this);
    dispatch(actions.login(this._email.value, this._password.value, redirectCallback));
    // console.log(this.props);
    // if (this.props.currentUserEmail) this.props.history.push('/userinfo');
  }

  handleShowRegistration(){
    this.setState({showRegistrationForm: true});
  }

  render(){
    const onSubmitCallback = (this.state.showRegistrationForm) ? this.handleRegistration : this.handleLogin;

    return (
      <div>
        <div className="form">
          {(this.state.showRegistrationForm)
          ? <h3>Register</h3>
          : <h3>Log In</h3>}
          <br/>
          <form onSubmit={onSubmitCallback}>
            <h4>Email</h4>
            <input type='email'
              id='email'
              placeholder='input email address here'
              ref={(input) => {this._email = input;}}/><br/>

            <h4>Password</h4>
            <input type='password'
              id='password'
              placeholder='input password here'
              ref={(input) => {this._password = input;}}/><br/>

            {(this.state.showRegistrationForm)
            ?
            <div>
              <h4>Name</h4>
              <input type='text'
                id='name'
                placeholder='input name here'
                ref={(input) => {this._name = input;}}/>
            </div>
            : <span></span>}

            {(this.state.showRegistrationForm)
             ? <button type="submit">Register</button>
             : <button type="submit">Login</button>}
          </form>
          {(this.state.showRegistrationForm)
           ? <span></span>
           : <button type="button" onClick={this.handleShowRegistration}>Create New User</button>}
           <div className="user-info">
             <h3></h3>
           </div>
        </div>
        <style jsx>{`
          h4 {
            margin: 0px;
            padding: 5px;
          }

          .form {
            text-align: center;
            margin: auto;
          }

          form {
            margin: auto;
          }

          input {
            width: 140px;
            height: 30px;
          }
  							`}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserEmail: state.user.email
  }
}

Home.propTypes = {
};

export default connect(mapStateToProps)(Home);
