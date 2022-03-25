import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Pagination from './components/Pagination';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Favorites from './components/Favorites';

function App() {
  return (
    <BrowserRouter>
       <NavBar/>
         <Routes>
           <Route path='/' element={<><Banner/>
                                      <Movies/>
                                      </>} />
           <Route path='/favorites' element={<Favorites/>} />                          
         </Routes>
       {/* <Banner/>
       <Movies/>
       <Pagination/> */}
      {/* <h2>Banner</h2>
      <h2>Trending</h2>
      <h2>Pagination</h2> */}
    </BrowserRouter>
  );
}

export default App;
