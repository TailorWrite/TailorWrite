import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@material-tailwind/react";
import { Bounce, ToastContainer } from 'react-toastify';
import { pdfjs } from 'react-pdf';

import { LandingPage, LoginPage, SignupPage, ErrorPage } from './pages';
import NotFound from "./components/common/NotFound";

import LandingRouter from "./layouts/MarketingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ApplicationsLayout from './layouts/ApplicationsLayout';
import SettingsLayout from './layouts/SettingsLayout';

import ProfilePage from './views/ProfilePage';
import DashboardHome from './views/DashboardHome';
import ApplicationDetails from './views/ApplicationDetails';
import GeneralSettings from './views/settings/GeneralSettings';
import DataSettings from './views/settings/DataSettings';

import PathConstants from './pathConstants';
import { handleAddApplication, handleApplicationSubmit, handleLogin, handleProfile } from './actions';
import { allApplicationLoader, applicationLoader, profileLoader } from './loaders';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
        action: handleLogin,
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
            loader: profileLoader,
            action: handleProfile,
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
          
          <ToastContainer
            stacked
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
