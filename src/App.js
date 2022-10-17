import React, { Suspense } from 'react';
import './App.css';
import Navbar from './comonents/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import ProfileContainer from './comonents/Profile/ProfileContainer';
import Login from './comonents/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer.ts'
import MyPreloader from './comonents/UI/MyPreloader/MyPreloader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/redux-store'
import HeaderContainer from './comonents/Header/HeaderContainer';
const Dialogs = React.lazy(() => import('./comonents/Dialogs/Dialogs'))
const Users = React.lazy(() => import('./comonents/Users/Users'))

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
              <Route path='/dialogs/*' element={<Dialogs />} />
              <Route path='/profile/' element={<ProfileContainer />} />
              <Route path='/profile/:userId' element={<ProfileContainer />} />
              <Route path='/users' element={<Users />} />
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