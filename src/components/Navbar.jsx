import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import * as actions from './../actions/index.js'

function Navbar(props){

  function handleLogout(){
    const { dispatch } = props;
    dispatch(actions.removeUser());
  }
  return(
    <div>
      <style>{`
        .navbar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          justify-items: center;
          background-color: black;
        }

        .navbar h3 {
          color: white;
        }
      `}
      </style>
      <div className="navbar">
        <div>
          <h3>Home</h3>
        </div>
        <div>
          <h3>Game</h3>
        </div>
        <div>
          <h3>Instructions</h3>
        </div>
        <div>
          {(props.currentUserEmail)
          ? <h3 type="button" onClick={handleLogout}>Logout {props.currentUserEmail}</h3>
          : <h3>Login</h3>}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUserEmail: state.user['email']
  }
}

Navbar.propTypes = {
  dispatch: PropTypes.func,
  currentUserEmail: PropTypes.string
}

export default connect(mapStateToProps)(Navbar)
