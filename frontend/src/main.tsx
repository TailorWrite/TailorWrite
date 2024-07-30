import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

// import App from './App.tsx'
import Root from "./routes/root";
import PathConstants from './routes/pathConstants';

import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";
import ErrorPage from "./routes/ErrorPage";
import LandingPage from './routes/LandingPage';
import NewDashboardRouter from "./routes/DashboardRouter";

import NotFound from "./components/NotFound";
import DashboardHome from './routes/DashboardHome';

import './index.css';

const router = createBrowserRouter([
  {
    path: PathConstants.HOME,
    element: <Root />,
    errorElement: <ErrorPage />,
    children : [
      {
        path: PathConstants.HOME,
        element: <LandingPage />,
      },
      {
        path: PathConstants.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PathConstants.SIGNUP,
        element: <SignupPage />,
      },
    ]
  },
  {
    path: PathConstants.DASHBOARD,
    element: <NewDashboardRouter />,
    children: [
      {
        path: PathConstants.DASHBOARD, 
        element: <DashboardHome />,    // TODO: Add sections here
      },
      {
        path: PathConstants.GENERATE, 
        element: <NotFound />,    // TODO: Add sections here
      },
      {
        path: PathConstants.ARCHIVE, 
        element: <NotFound />,    // TODO: Add sections here
      }
    ]
  },
], { basename: PathConstants.BASENAME });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
