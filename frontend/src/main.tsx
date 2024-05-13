import React from 'react';
import ReactDOM from 'react-dom';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import axios from 'axios';
import { Toaster } from 'sonner';
import { UserContextProvider } from "../context/userContext"
import Landing from './Landing';
import Expense from './Expense';
import Categories from './Categories';
import Debt from './Debt';
import Dashboard from './Dashboard';
import Reports from './Reports';
import Register from './Register';
import Login from './Login';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// Router configuration
const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Landing />}>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/expense" element={<Expense />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/debt" element={<Debt />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>,
  ])
);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function App({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <UserContextProvider>
        <Toaster richColors />
          {children}
      </UserContextProvider>
    </>
  );
}