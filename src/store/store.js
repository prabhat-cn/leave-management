/* eslint-disable prettier/prettier */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import sidePanelReducer from './reducers/sidePanelReducer'
import userRegReducer from "./reducers/userRegReducer";
import loginReducer from "./reducers/loginReducer";
import forgetPassReducer from "./reducers/forgetPassReducer";
import updatePassReducer from "./reducers/updatePassReducer";
import profileReducer from "./reducers/profileReducer";
import leaveReducer from "./reducers/leaveReducer";
import chatReducer from './reducers/chatReducer'

export default configureStore({
  reducer: {
    // sideBar: sidePanelReducer,
    registration: userRegReducer,
    login: loginReducer,
    forgetPassword: forgetPassReducer,
    updatePassword: updatePassReducer,
    profile: profileReducer,
    leave: leaveReducer,
    chats: chatReducer,
  },
  middleware: [...getDefaultMiddleware(), ]
})
