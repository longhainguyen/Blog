import './App.css';
import Layout from './Layout';
import { UserContextProvider } from './UserContext';
import Header from './header';
import IndexPage from './pages/indexPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import Post from './post';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <UserContextProvider>
      <Routes >
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Route>
      </Routes >
    </UserContextProvider>
  );
}

export default App;
