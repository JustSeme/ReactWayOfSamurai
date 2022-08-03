import './App.css';
import Navbar from './comonents/Navbar/Navbar';
import DialogsContainer from './comonents/Dialogs/DialogsContainer';
import News from './comonents/News/News';
import Music from './comonents/Music/Music';
import Settings from './comonents/Settings/Settings';
import { Route, Routes } from 'react-router-dom';
import UsersContainer from './comonents/Users/UsersContainer';
import ProfileContainer from './comonents/Profile/ProfileContainer';
import HeaderContainer from './comonents/Header/HeaderContainer';

function App() {
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/' element={<ProfileContainer />} />
          <Route path='/dialogs/*' element={<DialogsContainer />} />
          <Route path='/profile/' element={<ProfileContainer />} />
          <Route path='/profile/:userId' element={<ProfileContainer />} />
          <Route path='/users' element={<UsersContainer />} />
          <Route path='/news' element={<News />} />
          <Route path='/music' element={<Music />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
