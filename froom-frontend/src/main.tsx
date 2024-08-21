import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ThemeProvider} from '@material-tailwind/react';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Wardrobe from './components/Wardrobe/Wardrobe';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import {Toaster} from 'react-hot-toast';
import AuthWrapper from './AuthWrapper';

const router = createBrowserRouter([
    {
        path: '*',
        element: <App />,
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/contact',
        element: <Contact/>
    },
    {
        path:'/wardrobe',
        element: <Wardrobe />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/profile',
        element: <Profile />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Toaster position='top-center'/>
      <ThemeProvider>
          <AuthWrapper>
              <RouterProvider router={router} />
          </AuthWrapper>
      </ThemeProvider>
  </React.StrictMode>,
)
