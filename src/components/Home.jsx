import React from 'react';
import PropTypes from 'prop-types';

function Home(props){
  let _email = null;
  let _password = null;

  return (
    <div>
      <div className="form">
        <h3>Register or Log In</h3>
        <br/>
        <form>
          <h4>Email</h4>
          <input type='email'
            id='email'
            placeholder='input email address here'
            ref={(input) => {_email = input;}}/><br/>

          <h4>Password</h4>
          <input type='text'
            id='password'
            placeholder='input password here'
            ref={(input) => {_password = input;}}/>
        </form>
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

Home.propTypes = {
};

export default Home;
