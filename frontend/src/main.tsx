import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

// import App from './App.tsx'
import Root from "./routes/root";
import ErrorPage from "./routes/ErrorPage";
import LoginPage from "./routes/LoginPage";

import PathConstants from './routes/pathConstants';
import './index.css';

const router = createBrowserRouter([
  {
    path: PathConstants.HOME,
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
], { basename: PathConstants.BASENAME });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
