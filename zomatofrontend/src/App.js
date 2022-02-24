import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import RestaurantDetail from './components/RestaurantDetail';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React from 'react';
import Filter from './components/Filter';

function App() {
  return (
    <div>

    <Header></Header>
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home/>}></Route>
       <Route path='edumato/restaurantDetails/:rName' element={<RestaurantDetail/>}></Route>
       <Route path='edumato/Restaurants/filter/' element={<Filter/>}></Route>
       
       {/* <Route path="/tab" element={<ReactTabs></ReactTabs>}></Route> */}
     </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
