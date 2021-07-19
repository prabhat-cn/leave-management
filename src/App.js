/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
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

// const PrivateRoute = ({ component: Component, auth, name, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       auth === true ? <Component {...props} name={name} /> : <Redirect to="/login" />
//     }
//   />
// )
const EmployeeRoute = ({ component: Component, auth, isEmployee, isProManager, name, ...rest }) => {
  // console.log(isEmployee)
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (auth === false) {
            return <Redirect to="/login" />
          }

          // if (auth === true && isEmployee !== true) {
          //   return <Redirect to="/" />
          // }

          return <Component {...props} />
        }}
      />
    </>
  )
}

const PublicRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (auth !== true ? <Component {...props} /> : <Redirect to="/" />)}
  />
)

const App = () => {
  let authState = false
  let employee = false
  if (localStorage.getItem('lMuserDataToken') !== null) {
    // to get string value data  by "JSON.parse"
    const userData = JSON.parse(localStorage.getItem('lMuserDataToken'))
    // console.log(userData.user_role)
    authState = userData ? true : false
    employee = userData.user_role === 'employee' ? true : false
  }

  return (
    <React.Fragment>
      <ToastContainer />
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
            <EmployeeRoute
              exact
              auth={authState}
              isEmployee={employee}
              path="/404"
              name="Page 404"
              component={Page404}
            />
            <EmployeeRoute
              exact
              auth={authState}
              isEmployee={employee}
              path="/500"
              name="Page 500"
              component={Page500}
            />
            <EmployeeRoute
              path="/"
              auth={authState}
              isEmployee={employee}
              name="Home"
              component={DefaultLayout}
            />
            <EmployeeRoute
              path="/dashboard"
              auth={authState}
              isEmployee={employee}
              name="Home"
              component={DefaultLayout}
            />
            {authState ? (
              <Redirect exact from="/" to="/dashboard" />
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
