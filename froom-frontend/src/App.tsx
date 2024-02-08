import Wardrobe from './components/Wardrobe/Wardrobe.tsx';
import {Route, Routes} from 'react-router-dom';
import Landing from './components/Landing/Landing.tsx';
import About from './components/About/About.tsx';
import Contact from './components/Contact/Contact.tsx';

function App() {

  return (
      <>
          <Routes>
              <Route path={'/'} element={<Landing/>}></Route>
              <Route path={'/about'} element={<About />}></Route>
              <Route path={'/contact'} element={<Contact />}></Route>
              <Route path={'/wardrobe'} element={<Wardrobe />}></Route>
          </Routes>
      </>
  )
}

export  default App
