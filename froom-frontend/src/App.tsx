import NavBar from './components/NavBar/NavBar.tsx';
import Wardrobe from './components/Wardrobe/Wardrobe.tsx';

function App() {

  return (
      <>
          <div className="min-h-screen flex flex-col">
              <NavBar />
              <div className="flex-1 flex flex-col justify-center items-center w-screen">
                <Wardrobe/>
              </div>
          </div>
      </>
  )
}

export default App
