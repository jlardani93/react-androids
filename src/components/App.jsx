import React from 'react'
import { Switch, Route, withRouter, Link} from 'react-router-dom'
import { connect } from 'react-redux'

class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(
      <div>
        <Switch>
          <Route exact path='/' component={} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(App)); 
