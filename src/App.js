import logo from './logo.svg';
import './App.css';
import Article from './components/Article';
import AddArticle from './components/AddArticle';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Full_page from './components/Full_page';
import MyBlogs from './components/MyBlogs';
import DiaryPage from './components/DiaryPage';
import MyDiary from './components/MyDiary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route path="/MyBlogs" element={<MyBlogs/>}/>
          <Route path='DiaryPage' element={<DiaryPage/>}></Route>
          <Route path="/MyDiary" element={<MyDiary/>}></Route>
          <Route path='/Full_page/:id' element={<Full_page />} />
          <Route path='/AddArticle' element={<AddArticle />} />
          <Route path='/' element={
            <div className='row'>
                <Article />
            </div>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
