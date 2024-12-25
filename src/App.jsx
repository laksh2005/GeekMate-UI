
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Login from './components/Login'
import Profile from './components/Profile'
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Network from './components/Network';
import Invitations from './components/Invitations';
import Faqs from './components/Faqs';

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/network" element={<Network />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/faqs" element={<Faqs />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
