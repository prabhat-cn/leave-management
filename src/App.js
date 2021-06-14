/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react'
import { HashRouter, Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const ForgetPassword = React.lazy(() => import('./views/pages/forgetpassword/ForgetPassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const PrivateRoute = ({ component: Component, auth, name, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Component {...props} name={name} /> : <Redirect to="/login" />
    }
  />
)

const PublicRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (auth !== true ? <Component {...props} /> : <Redirect to="/" />)}
  />
)

const App = () => {
  const userData = localStorage.getItem('lMuserDataToken')
  const authState = userData ? true : false
  return (
    <React.Fragment>
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            {/* <Route exact path="/" name="Login" component={Login} /> */}
            {/* Public */}
            <PublicRoute exact auth={authState} path="/login" name="Login" component={Login} />
            <PublicRoute
              exact
              auth={authState}
              path="/register"
              name="Register"
              component={Register}
            />
            <PublicRoute
              exact
              auth={authState}
              path="/forgetpassword"
              name="Forget Password"
              component={ForgetPassword}
            />
            {/* Private */}
            <PrivateRoute exact auth={authState} path="/404" name="Page 404" component={Page404} />
            <PrivateRoute exact auth={authState} path="/500" name="Page 500" component={Page500} />
            <PrivateRoute path="/" auth={authState} name="Home" component={DefaultLayout} />
            <PrivateRoute path="/admin" auth={authState} name="Home" component={DefaultLayout} />
            {/* condonation */}
            {/* {authState ? (
              <Redirect exact from="/" to="/login" />
            ) : (
              <Redirect from="/" to="/register" />
            )} */}
            {authState ? (
              <Redirect exact from="/" to="/login" />
            ) : (
              <Redirect from="/" to="/forgetpassword" />
            )}
            {authState ? (
              <Redirect exact from="/" to="/admin" />
            ) : (
              <Redirect from="/" to="/login" />
            )}
          </Switch>
        </React.Suspense>
      </Router>
    </React.Fragment>
  )
}

export default App
