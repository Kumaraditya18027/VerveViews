import logo from './logo.svg';
import './App.css';
import Article from './components/Article';
import AddArticle from './components/AddArticle';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Full_page from './components/Full_page';

function App() {
  return (
    <div className='container'>
      <Router>
      <Navbar/>
        <Routes>
        <Route path='/register' element={
          <Register></Register>
        }></Route>
        <Route path='/signin' element={
          <Login></Login>
        }>
        </Route>
        <Route path='/Full_page/:id' element={
          <Full_page></Full_page>
        }></Route>
        <Route path='/' element={
                <div className='row'>
                <div className='col-md-8'>
                <Article></Article>
                </div>
                <div className='col-md-4'>
                  <AddArticle></AddArticle>
                </div>
              </div>

        }></Route>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
