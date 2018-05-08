import React from 'react'
import { Switch, Route, withRouter, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import LandingPage from './LandingPage'

class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(
      <div>
        <Header/>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={LandingPage} />
        </Switch>
        <Footer/>
      </div>
    )
  }
}

export default withRouter(connect()(App));
