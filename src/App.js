import React, { Component } from 'react'
import { HashRouter, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
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

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" name="Login" render={(props) => <Login {...props} />} />
            <Route exact path="/login" name="Login" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/register"
              name="Register"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/forgetpassword"
              name="Forget Password"
              render={(props) => <ForgetPassword {...props} />}
            />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
            {/* <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </Router>
    </React.Fragment>
  )
}

export default App
