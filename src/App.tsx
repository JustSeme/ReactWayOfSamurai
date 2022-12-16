import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Login from './comonents/Login/Login';
import { initializeAppThunkCreator } from './redux/appReducer'
import MyPreloader from './comonents/UI/MyPreloader/MyPreloader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store, { AppStateType, useTypedDispatch } from './redux/redux-store'
import Profile from './comonents/Profile/Profile';
import { useSelector } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { parse, stringify } from 'query-string';
import {
  MehOutlined,
  UserOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Layout, Menu,  } from 'antd';
import { AppHeader } from './comonents/Header/Header';
const Dialogs = React.lazy(() => import('./comonents/Dialogs/Dialogs'))
const Users = React.lazy(() => import('./comonents/Users/Users'))
const ChatPage = React.lazy(() => import('./comonents/pages/Chat/ChatPage'))

const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const initialized = useSelector((state: AppStateType) => state.app.initialized)

  const location = useLocation()
  const dispatch = useTypedDispatch()

  const initializeApp = () => {
    dispatch(initializeAppThunkCreator())
  }

  useEffect(() => {
    initializeApp()
  }, [])

  if(!initialized) return <MyPreloader />

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname.length > 1 ? location.pathname : '/profile']}
          selectable
          items={[
            {
              key: '/profile',
              icon: <MehOutlined />,
              label: <Link to='/profile'>Profile</Link>,
            },
            {
              key: '/users',
              icon: <UserOutlined />,
              label: <Link to='/users'>Developers</Link>,
            },
            {
              key: '/dialogs/chat',
              icon: <MailOutlined />,
              label: <Link to='/dialogs/chat'>Chat</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Suspense fallback={<MyPreloader />}>
          <Routes>
            <Route path='/' element={<Profile />} />
            <Route path='/dialogs/:dialogId' element={<Dialogs />} />
            <Route path='/profile/' element={<Profile />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/users' element={<Users />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dialogs/chat' element={<ChatPage />} />
          </Routes>
        </Suspense>
        </Content>
      </Layout>
    </Layout>
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