import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./userReducer";
import dialogsReducer from "./dialogsReducer.ts";
import profileReducer from "./profileReducer";
import authReducer from "./authReducer.ts";
import thunkMiddleware from 'redux-thunk'
import appReducer from "./appReducer.ts";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: userReducer,
    auth: authReducer,
    app: appReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store