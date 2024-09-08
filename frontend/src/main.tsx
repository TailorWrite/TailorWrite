import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@material-tailwind/react";

import { LandingPage, LoginPage, SignupPage, ErrorPage } from './pages';
import NotFound from "./components/common/NotFound";

import LandingRouter from "./routers/LandingRouter";
import DashboardRouter from "./routers/DashboardRouter";
import ApplicationsLayout from './routers/ApplicationsLayout';

import Profile from './views/Profile';
import DashboardHome from './views/DashboardHome';
import ApplicationDetails from './views/ApplicationDetails';

import PathConstants from './pathConstants';
import { handleAddApplication, handleUpdateApplication } from './actions';    // TODO: Could be added to actions.ts
import { allApplicationLoader, applicationLoader } from './loaders';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: PathConstants.HOME,
    element: <LandingRouter />,
    errorElement: <ErrorPage />,
    children: [
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
    element: <DashboardRouter />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: PathConstants.APPLICATIONS,
        element: <ApplicationsLayout />,
        loader: allApplicationLoader,
        children: [
          {
            path: PathConstants.NEW_APPLICATION,
            element: <ApplicationDetails />,
            loader: () => Promise.resolve({}),
            // Adds a new application to the database
            action: handleAddApplication,
          },
          {
            path: PathConstants.APPLICATION,
            element: <ApplicationDetails />,
            // Loads application data of the given uuid
            loader: applicationLoader,
            action: handleUpdateApplication,
          },
        ]
      },
      // { 
      //   path: PathConstants.NEW_APPLICATION, 
      //   element: <ApplicationTracker />,
      // },
      // { 
      //   path: PathConstants.APPLICATION, 
      //   element: <ApplicationTracker />,
      //   loader: applicationLoader,
      // },

      {
        path: PathConstants.GENERATE,
        element: <NotFound />,
      },
      {
        path: PathConstants.ARCHIVE,
        element: <NotFound />,
      },
      {
        path: PathConstants.PROFILE,
        element: <Profile />,
      },
    ],
  },  
], { basename: PathConstants.BASENAME });


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
