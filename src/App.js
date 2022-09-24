import React, { Suspense } from 'react';
import './App.css';
import Navbar from './comonents/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import ProfileContainer from './comonents/Profile/ProfileContainer';
import HeaderContainer from './comonents/Header/HeaderContainer';
import Login from './comonents/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer'
import MyPreloader from './comonents/UI/MyPreloader/MyPreloader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/redux-store.js'
const DialogsContainer = React.lazy(() => import('./comonents/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./comonents/Users/UsersContainer'))

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) return <MyPreloader />
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Suspense fallback={<MyPreloader />}>
            <Routes>
              <Route path='/' element={<ProfileContainer />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/profile/' element={<ProfileContainer />} />
              <Route path='/profile/:userId' element={<ProfileContainer />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

const AppContainer = connect(mapStateToProps, { initializeApp })(App)

const SamuraiJSApp = (props) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp