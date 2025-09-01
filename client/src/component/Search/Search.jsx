import React, { useRef } from 'react'
import{Col, Container, Form, FormGroup}from'react-bootstrap'
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEditLocation } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";
import { Button } from 'reactstrap';
import useFetch from '../../Hocks/useFetch';
import { BASE_URL } from '../../Service/Config';
import { Navigate, useNavigate } from 'react-router-dom';
import './Search.css'
const Search = () => {

    const locationRef = useRef('')
    const distanceRef = useRef(0)
    const maxGroupRef = useRef(0 )
    const navigate = useNavigate();
        const searchHandler = async()=>{
            const location = locationRef.current.value
            const distance = distanceRef.current.value
            const maxGroupSize = maxGroupRef.current.value
       if(location===""||distance===""||maxGroupSize==="" ){return alert("all felid are required")}
       const res = await fetch(`${BASE_URL}/tours/search/getTourSearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)
      if(!res.ok){alert("somthing went wrong")}
      const result  = await res.json()
      navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, { state: result.data });
    
    }
   
  return (
    <Container>
   <Col lg="12">
    <div className="searchBar">
      <Form className='d-flex align-items-center gap-4'> 
        <FormGroup className='d-flex  gap-4 form_group form_group-fast'>
            <span>
            <CiLocationOn style={{fontSize:"25px",color:"#f76e4c"}} />
            </span>
            <div className="">
                <h6>Location</h6>
           <input  type='text' placeholder='where are you going' ref={locationRef}/>
          
            </div>

        </FormGroup>
        <FormGroup className='d-flex  gap-4 form_group form_group-fast'>
            <span>
            <MdOutlineEditLocation style={{fontSize:"25px",color:"#f76e4c"}} />
            </span>
            <div className="">
                <h6>Distance</h6>
           <input  type='number' placeholder='Distance' ref={distanceRef}/>
          
            </div>

        </FormGroup>
        <FormGroup className='d-flex  gap-4 form_group form_group-fast'>
            <span>
            <IoPeople style={{fontSize:"25px",color:"#f76e4c"}} />
            </span>
            <div className="">
                <h6>Max People</h6>
           <input  type='number' placeholder='0' ref={maxGroupRef}/>
          
            </div>

        </FormGroup>
        <FormGroup>
            <Button className='formbutn' onClick={searchHandler}>
        <FaSearchLocation /></Button>
            </FormGroup></Form> 
    </div>
   </Col></Container>
  )
}

export default Search