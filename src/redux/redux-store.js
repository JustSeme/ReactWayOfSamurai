import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: userReducer,
    auth: authReducer,
})

let store = createStore(reducers)

window.store = store

export default store