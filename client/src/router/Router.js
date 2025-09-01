import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "../pages/Home"
import Tours from "../pages/Tours"
import Login from "../pages/Login"
import Register from "../pages/Register"
import TourDetails from "../pages/TourDetails"
import SearchResult from "../pages/SearchResult"
import About from '../pages/About'
const Router = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/tours/:id' element={<TourDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/tours/search' element={<SearchResult/>}/>
      <Route path='/tours' element={<Tours/>}/>

    </Routes>
  )
}

export default Router