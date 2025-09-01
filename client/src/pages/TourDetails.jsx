import React, { useContext, useRef, useState } from 'react'
import tourData from "../assets/data/tours"
import { useParams } from 'react-router-dom'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import calculateAvgRating from "../Service/Utile"
import { MdEditLocation } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
// Import the library
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

import Datetime from 'react-datetime';
import { DatePicker } from 'react-datepicker';
import { ListGroup, ListGroupItem } from "reactstrap"
import useFetch from '../Hocks/useFetch'
import { BASE_URL } from '../Service/Config'
import './page.css'
import avatar from "../assets/images/avatar.jpg"

const TourDetails = () => {
  const { id } = useParams()

  const { data: tour, error, loading } = useFetch(`${BASE_URL}/tours/${id}`);
  const { photo, title, desc, price, city, address, distance, maxGroupSize, reviews } = tour
  const [tourRating, setTourRating] = useState(null)
  const { user } = useContext(AuthContext)
  const [booking, setBooking] = useState({
    userId: user && user._id,
    email: user && user.email,
    tourName: title,
    fullName: "",

    guestSize: 1,
    bookAt: '',
  })

  const handleChange = e => {
    setBooking(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("handleClick called");

    try {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token);
      if (!token) {
        console.log("Token not found");
        alert("Please sign in");
        return;
      }
      console.log('Retrieved Token:', token);

      const res = await fetch('http://localhost:5000/booking', {  // <-- Corrected URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${localStorage.getItem('authToken')}`, // Corrected token format
      
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });
      

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server responded with an error:", errorData);
        alert(errorData.message || "Booking failed.");
        return;
      }

      const result = await res.json();
      console.log("Booking successful:", result.data);
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };


  /*const handleClick =async e => {
 
    try {
      if (!user || user == undefined || user == null) { alert("please sign in") }
    
      const res = await fetch(`${BASE_URL}/booking`,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(booking)
      })
      const result = await res.json()
      if(!res.ok){alert(result.message)}
      console.log(result.data)
      
   
     } catch (error) {
     
     }
    console.log(booking);

  }*/


  const reviewMsRef = useRef('')


  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Safely access the review text from the ref
    const reviewText = reviewMsRef.current ? reviewMsRef.current.value : ''; 
  
    // Check if the user is logged in
    if (!user) {
      alert("Please sign in");
      return;
    }
  
    try {
      // Construct the review object
      const reviewObj = {
        name: user?.username,
        reviewText,
        rating: tourRating,
      };
  
      // Send the review to the server
      const res = await fetch(`${BASE_URL}/tours/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('authToken')}`, // Corrected token format
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });
  
      // Parse the server's response
      const result = await res.json();
  
      // Handle response errors
      if (!res.ok) {
        alert(result.error || "Something went wrong. Please try again.");
        return;
      }
  
      // Handle success
      console.log(result.data);
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  //const {photo,title,desc,price,reviews,city,address,distance,maxGroupSize}=tour
  const { avgRating, totalRating } = calculateAvgRating(reviews)
  const services = 10
  const totaAmount = Number(price) * (booking.guestSize) + Number(services)
  return (
    <div>
      <section>
        <Container>

          <Row>
            {loading && <h4>.........loading....</h4>}
            {error && <h4>{error}</h4>}
            {!loading && !error && <Col lg='8'>
              <div className="tourContent">
                <img src={photo} alt="" style={{ width: "100%" }} />
                <Form className='form-frame' >
                  <div className="tourInfo">
                    <h2>{title}</h2>
                    <div className="detail">
                      <div className='inndet'>
                        <span className="tour_rating d-flex align-items-center gap-1">
                          <FaStar style={{ marginRight: "3px", color: "#f7994c" }} />
                          {avgRating === 0 ? null :
                            avgRating}
                          {totalRating === 0 ? (
                            "Not rated") : (
                            <span>({reviews?.length})</span>
                          )}
                        </span>
                        <span>
                          <MdEditLocation style={{ fontSize: "20px", marginRight: "3px" }} />
                          {address}
                        </span></div>
                      <div className="extraDetail">
                        <span>
                          <MdEditLocation style={{ fontSize: "20px", marginRight: "3px" }} />
                          {city}
                        </span>
                        <span>
                          <MdAttachMoney style={{ fontSize: "20px", marginRight: "3px" }} />
                          {price} /per person
                        </span>
                        <span>
                          <IoPeopleSharp style={{ fontSize: "20px", marginRight: "3px" }} />
                          {maxGroupSize}person
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="description">
                    <h2 >Description</h2>
                    <span>{desc}</span>
                  </div>

                </Form>
                <Form className='form-frame' onSubmit={submitHandler}>
                  <div className="tourInfo">
                    <h2>Reviews ({reviews?.length}reviews)</h2>

                  </div>
                  <div className="ratingGroup">
                    <span onClick={() => setTourRating(1)}>1 <FaStar style={{ marginRight: "3px", color: "#f7994c" }} /></span>
                    <span onClick={() => setTourRating(2)}>2 <FaStar style={{ marginRight: "3px", color: "#f7994c" }} /></span>
                    <span onClick={() => setTourRating(3)}>3 <FaStar style={{ marginRight: "3px", color: "#f7994c" }} /></span>
                    <span onClick={() => setTourRating(4)}>4 <FaStar style={{ marginRight: "3px", color: "#f7994c" }} /></span>
                    <span onClick={() => setTourRating(5)}>5 <FaStar style={{ marginRight: "3px", color: "#f7994c" }} /></span>
                  </div>
                  <div className="inputReview">
                    <input type="text" placeholder="share your throught" ref={reviewMsRef} />
                    <Button onClick={submitHandler}>Subscribe</Button>
                  </div>
                </Form>
                <Form className="form-frame">
                  <ListGroup className="userReviews">
                    {reviews?.map(review => (
                      <ListGroupItem key={review._id} className="reviewsItem" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="" style={{ display: "flex", flexDirection: "column" }}>
                          <div className="" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "130px" }}>

                            <img src={avatar} alt="" style={{ width: "40px", marginBottom: "10px" }} />
                            <div className="" style={{}}>
                              <h5>{review.name}</h5>
                              <p style={{ marginTop: "-3", fontSize: "13px" }}>5-12-2020</p>
                              <p>{review.reviewText}</p>
                            </div>
                          </div>
                          <h6 style={{ marginLeft: "10px" }}>{review.reviewText}</h6>
                        </div>
                        <span className="" style={{ display: "flex", alignItems: "center" }}>
                          {review.rating} <FaStar style={{ marginRight: "3px" }} />
                        </span>



                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Form>
              </div>
            </Col>}
            <Col lg='4'>
              <Form className='form-frame' >
                <div className="tourPrice" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px" }}>
                  <span style={{ display: "flex" }}>
                    <h3>${price}</h3> /perperson
                  </span>
                  <span className="tour_rating d-flex align-items-center gap-1">
                    <FaStar style={{ marginRight: "3px", color: "#f7994c" }} />
                    {avgRating == 0 ? null : avgRating}
                    {totalRating == 0 ? (
                      "Not rated"
                    ) : (
                      <span>({reviews?.length})</span>
                    )}
                  </span>
                </div>
                <br></br>
                <ListGroup style={{ padding: "10px", }} className='booking'>
                  <h3>Information</h3>

                  <Form onSubmit={handleClick}>
                    <ListGroupItem className="listinfo">
                      <input
                        type="text"
                        id="fullName"
                        placeholder="Enter your name"
                        value={booking.fullName}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={booking.email}
                        onChange={handleChange}
                        required
                      />

                      <input
                        type="text"
                        id="tourName"
                        placeholder="Enter tour name"
                        value={booking.tourName || ''}
                        onChange={handleChange}
                        required
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <input
                          type="date"
                          id="bookAt"
                          value={booking.bookAt}
                          onChange={handleChange}
                          required
                        />
                        <input
                          type="number"
                          id="guestSize"
                          placeholder="Guest size"
                          value={booking.guestSize}
                          onChange={handleChange}
                          required
                        /></div>

                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0" style={{ display: "flex", justifyContent: "space-between", marginBottom: "-4px", padding: "10px" }}>
                      <h5 className="d-flex align-items-center gap-1" style={{ fontWeight: "lighter", fontSize: "15px" }}>
                        ${price} <i class="ri-close-line"></i> 1 person
                      </h5>
                      <span> ${price}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0" style={{ display: "flex", justifyContent: "space-between" }}>
                      <h5 style={{ fontWeight: "lighter", fontSize: "15px" }}>Service charge</h5>
                      <span> ${services}</ span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0 total" style={{ display: "flex", justifyContent: "space-between" }}>
                      <h5 style={{ fontSize: "15px" }}>Total</h5>
                      <span> ${totaAmount}</ span>
                    </ ListGroupItem>
                    <Button type="submit" onClick={handleClick} style={{ margin: "10px", width: "90%", borderRadius: "20px", backgroundColor: "#f7994c", border: "none" }}>Book now</Button>

                  </Form>

                </ListGroup>
              </Form>

            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default TourDetails