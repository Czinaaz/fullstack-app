import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ArticlePage, { loader as articleLoader } from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [{
    path: '/',
    element: <HomePage />
  }, {
    path: '/about',
    element: <AboutPage />
  }, {
    path: '/articles',
    element: <ArticlesListPage />
  }, {
    path: '/contact',
    element: <ContactPage />
  }, {
    path: '/articles/:name', // -> /articles/learn-react
    element: <ArticlePage />,
    loader: articleLoader,
  },{
    path: '/login',
    element: <LoginPage/>
  },{
    path: '/create-account',
    element: <CreateAccountPage/>
  }]
}]

const router = createBrowserRouter(routes, {
  basename: '/fullstack-app',
});

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App