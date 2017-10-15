import { withRouter } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { APP_LOAD, REDIRECT } from '../constants/actionTypes'

import agent from '../agent'
import routes from '../routes'
import Header from './Header'

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
  inProgress: state.common.inProgress
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({
    type: APP_LOAD,
    payload,
    token,
    skipTracking: true
  }),
  onRedirect: (value = null) => dispatch({
    type: REDIRECT,
    value: value
  })
})

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      //this.context.router.replace(nextProps.redirectTo);
      this.props.history.push(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      agent.setToken(token)
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  render() {
    let path = this.props.location.pathname
    if ( /*path.indexOf('/login') !== -1 || path.indexOf('/register') !== -1 ||*/ path.indexOf('/play') !== -1) {
      var isNoHeader = true
    }
    //isNoHeader = true
    return (
      <div>
        {isNoHeader ? <div /> :
          <Header
            appName={this.props.appName}
            inProgress={this.props.inProgress}
            currentUser={this.props.currentUser} />}
        <div style={styles.body}>
          {this.props.appLoaded ? routes : null}
        </div>
      </div>
    )
  }
}

const styles = {
  body: {
    margin: '0 auto',
    padding: 0,
    maxWidth: 700,
    minWidth: 100
  }
}

App.propTypes = {
  redirectTo: PropTypes.string,
  history: PropTypes.any,
  location: PropTypes.any,
  onRedirect: PropTypes.func,
  onLoad: PropTypes.func,
  appName: PropTypes.string,
  inProgress: PropTypes.bool,
  currentUser: PropTypes.object,
  appLoaded: PropTypes.bool
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
