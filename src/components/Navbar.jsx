import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import * as actions from './../actions/index.js'
import { Link, Redirect } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedOut: false
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    const { dispatch } = this.props;
    dispatch(actions.removeUser());
    this.setState({loggedOut: true})
  }

  render(){
    console.log("props", this.props);
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
        <div>
          {(this.state.loggedOut)
          ? <Redirect to='/' />
        : <span></span>}
        </div>
        <div className="navbar">
          <div>
            {(this.props.currentUserName) ? <Link to="/userinfo"><h3>{this.props.currentUserName}</h3></Link> : <h3>Home</h3>}
          </div>
          <div>
            <h3>Game</h3>
          </div>
          <div>
            <h3>Instructions</h3>
          </div>
          <div>
            {(this.props.currentUserEmail)
            ? <h3 type="button" onClick={this.handleLogout}>Logout</h3>
            : <h3>Login</h3>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUserEmail: state.user['email'],
    currentUserName: state.user['name']
  }
}

// Navbar.propTypes = {
//   dispatch: PropTypes.func,
//   currentUserEmail: PropTypes.string,
//   currentUserName: PropTypes.string
// }

export default connect(mapStateToProps)(Navbar)
