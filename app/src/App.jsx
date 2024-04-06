import {RouterProvider, createBrowserRouter, Link} from 'react-router-dom'
import './App.css';
import React, {useEffect} from 'react';
import { AppProvider } from './AppContext';
import {Home} from './pages/Home';
import {Frens} from './pages/Frens';
import {Games} from './pages/Games';
import {Tasks} from './pages/Tasks';
import {TeamExplorer} from './pages/TeamExplorer';
import {Team} from './pages/Team';
import {Shop} from './pages/Shop';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/frens',
    element: <Frens/>
  },
  {
    path:'/games',
    element: <Games/>
  },
  {
    path:'/tasks',
    element: <Tasks/>
  },
  {
    path:'/team-explorer',
    element: <TeamExplorer/>
  },
  {
    path:'/team/:teamId',
    element: <Team/>
  }
  ,
  {
    path:'/shop',
    element: <Shop/>
  }
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
