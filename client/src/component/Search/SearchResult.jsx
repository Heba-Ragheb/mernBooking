import React, { useState } from 'react'
import {Col,Row,Container} from 'react-bootstrap'
import TourCard from '../../Service/TourCard';
import { useLocation } from 'react-router-dom'; 

const SearchResult = () => {
    const location = useLocation()
    const[data] = useState(location.state)
    console.log(data)
  return (
    <div>SearchResult</div>
  )
}

export default SearchResult