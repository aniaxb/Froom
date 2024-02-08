import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from '@material-tailwind/react';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Wardrobe from './components/Wardrobe/Wardrobe.tsx';
import About from './components/About/About.tsx';
import Contact from './components/Contact/Contact.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/contact',
        element: <Contact/>,
    },
    {
        path:'/wardrobe',
        element: <Wardrobe />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider>
          <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>,
)
