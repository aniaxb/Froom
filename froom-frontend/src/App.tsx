import Wardrobe from './components/Wardrobe/Wardrobe.tsx';
import {Route, Routes} from 'react-router-dom';
import Landing from './components/Landing/Landing.tsx';
import About from './components/About/About.tsx';
import Contact from './components/Contact/Contact.tsx';
import Login from './components/Login/Login.tsx';
import Register from './components/Register/Register.tsx';
import Profile from './components/Profile/Profile.tsx';

function App() {

  return (
      <>
          <Routes>
              <Route path={'*'} element={<Landing/>}></Route>
              <Route path={'/about'} element={<About />}></Route>
              <Route path={'/contact'} element={<Contact />}></Route>
              <Route path={'/wardrobe'} element={<Wardrobe />}></Route>
              <Route path={'/login'} element={<Login />}></Route>
              <Route path={'/register'} element={<Register />}></Route>
              <Route path={'/profile'} element={<Profile />}></Route>
          </Routes>
      </>
  )
}

export  default App
