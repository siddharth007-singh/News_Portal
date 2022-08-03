import React from 'react';
import Search from './Search';
import Pagination from './Pagination';
import Stories from './Stories';
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>News Portal Design</h1>
      <Search/>
      <Pagination/>  
      <Stories/>
    </div>
  )
}

export default App
