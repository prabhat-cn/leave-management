/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
// import sidePanelReducer from './reducers/sidePanelReducer'
import userRegReducer from "./reducers/userRegReducer";
import loginReducer from "./reducers/loginReducer";
import forgetPassReducer from "./reducers/forgetPassReducer";

export default configureStore({
  reducer: {
    // sideBar: sidePanelReducer,
    registration: userRegReducer,
    login: loginReducer,
    forgetPassword: forgetPassReducer,
  },
})
