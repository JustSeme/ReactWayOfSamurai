import { createStore, combineReducers, applyMiddleware, AnyAction } from "redux";
import userReducer from "./userReducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import authReducer from "./authReducer";
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import appReducer from "./appReducer";
import { useDispatch } from "react-redux";


export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: userReducer,
    auth: authReducer,
    app: appReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// @ts-ignore
window.store = store

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export default store