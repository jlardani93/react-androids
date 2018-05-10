import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

function UserInfo(props){

  return(
    <div>
      <div>
        <h1>Welcome to <em>React Androids</em>, {props.currentUserName}!</h1>
      </div>
      <div>
        <Link to="/game"><button type="button">Play Game</button></Link>
      </div>
      <style jsx>{`
      `}
      </style>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUserEmail: state.user['email'],
    currentUserName: state.user['name']
  }
}

UserInfo.propTypes = {
  dispatch: PropTypes.func,
  currentUserEmail: PropTypes.string,
  currentUserName: PropTypes.string
}

export default connect(mapStateToProps)(UserInfo)
