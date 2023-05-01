import './App.css';
import Layout from './Layout';
import { UserContextProvider } from './UserContext';
import Header from './header';
import CreatePostPage from './pages/creatPostPage';
import EditPostPage from './pages/editPostPage';
import IndexPage from './pages/indexPage';
import LoginPage from './pages/loginPage';
import PostPage from './pages/postPage';
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
          <Route path={'/create'} element={<CreatePostPage />} />
          <Route path={'/post/:id'} element={<PostPage />} />
          <Route path={'edit/:id'} element={<EditPostPage />} />
        </Route>
      </Routes >
    </UserContextProvider>
  );
}

export default App;
