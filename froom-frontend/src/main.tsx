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
import Login from './components/Login/Login.tsx';
import Register from './components/Register/Register.tsx';

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
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider>
          <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>,
)
