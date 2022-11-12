import React, { Suspense, useEffect } from 'react';
import './App.css';
import Navbar from './comonents/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './comonents/Login/Login';
import { initializeAppThunkCreator } from './redux/appReducer'
import MyPreloader from './comonents/UI/MyPreloader/MyPreloader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store, { AppStateType, useTypedDispatch } from './redux/redux-store'
import Header from './comonents/Header/Header';
import Profile from './comonents/Profile/Profile';
import { useSelector } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { parse, stringify } from 'query-string';
const Dialogs = React.lazy(() => import('./comonents/Dialogs/Dialogs'))
const Users = React.lazy(() => import('./comonents/Users/Users'))

const App = () => {
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useTypedDispatch()

  const initializeApp = () => {
    dispatch(initializeAppThunkCreator())
  }

  useEffect(() => {
    initializeApp()
  }, [])

  if(!initialized) return <MyPreloader />

  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Suspense fallback={<MyPreloader />}>
          <Routes>
            <Route path='/' element={<Profile />} />
            <Route path='/dialogs/*' element={<Dialogs />} />
            <Route path='/profile/' element={<Profile />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/users' element={<Users />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

const SamuraiJSApp = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          searchStringToObject: parse,
          objectToSearchString: stringify,
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </QueryParamProvider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp