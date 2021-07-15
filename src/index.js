import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
// import * as serviceWorker from './serviceWorker'
import 'react-toastify/dist/ReactToastify.css'

import { icons } from './assets/icons'

import { Provider } from 'react-redux'

// import store from './store/reducers/store'
import storeOps from './store/store'
import storeSide from './store/store1'
React.icons = icons

ReactDOM.render(
  // <Provider store={storeOps}>
  //   <Provider store={storeSide}>
  //     <App />
  //   </Provider>
  // </Provider>
  <>
    <Provider store={storeOps}>
      <App />
    </Provider>
  </>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.register()
serviceWorkerRegistration.register()
