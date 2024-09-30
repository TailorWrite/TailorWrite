import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@material-tailwind/react";

import { LandingPage, LoginPage, SignupPage, ErrorPage } from './pages';
import NotFound from "./components/common/NotFound";

import LandingRouter from "./layouts/MarketingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ApplicationsLayout from './layouts/ApplicationsLayout';
import SettingsLayout from './layouts/SettingsLayout';

import ProfilePage from './views/ProfilePage';
import DashboardHome from './views/DashboardHome';
import ApplicationDetails from './views/ApplicationDetails';
import ProfileDetails from './views/ProfilePage';
import GeneralSettings from './views/settings/GeneralSettings';
import DataSettings from './views/settings/DataSettings';

import PathConstants from './pathConstants';
import { handleAddApplication,, handleApplicationSubmit, handleProfile, handleUpdateApplication } from './actions';    // TODO: Could be added to actions.ts
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
    element: <DashboardLayout />,
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
            // Handles the update and deletion of an application
            action: handleApplicationSubmit,
          },
        ]
      },

      {
        path: PathConstants.PROFILE,
        element: <ProfileDetails/>,
        // Define the loader function to be called when the route is accessed
        loader: profileLoader,
        action: handleProfile,
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
        path: PathConstants.SETTINGS,
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <GeneralSettings />,
          },
          {
            path: PathConstants.PROFILE,
            element: <ProfilePage />,
          }, 
          {
            path: PathConstants.SETTINGS_DATA,
            element: <DataSettings />,
          }
        ]
      },
    ],
  },  

], { basename: PathConstants.BASENAME });


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
          <RouterProvider router={router}/>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
