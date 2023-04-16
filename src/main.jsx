import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main';
import Home from './Components/Home';
import Login from './Components/Login';
import Resister from './Components/Resister';
import AuthProviders from './providers/AuthProviders';
import Orders from './Components/Orders';
import PrivateRoutes from './routes/PrivateRoutes';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Resister></Resister>
      },
      {
        path:'/orders',
        element:<PrivateRoutes><Orders></Orders></PrivateRoutes>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProviders>
     <RouterProvider router={router} />
     </AuthProviders>
  </React.StrictMode>,
)
