import React, { useContext, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { FaStar } from 'react-icons/fa';
import { MdEditLocation, MdAttachMoney } from 'react-icons/md';
import { IoPeopleSharp } from 'react-icons/io5';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../Hocks/useFetch';
import calculateAvgRating from '../Service/Utile';
import avatar from '../assets/images/avatar.jpg';
import './page.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TourDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const reviewMsRef = useRef(null);

  const { data: tour, error, loading } = useFetch(`${BASE_URL}/tours/${id}`);

  // Destructure with defaults to avoid undefined errors
  const {
    photo = '',
    title = '',
    desc = '',
    price = 0,
    city = '',
    address = '',
    maxGroupSize = 0,
    reviews = [],
  } = tour || {};

  const { avgRating, totalRating } = calculateAvgRating(reviews);

  const services = 10;
  const [booking, setBooking] = useState({
    userId: user?._id || '',
    email: user?.email || '',
    tourName: title,
    fullName: '',
    guestSize: 1,
    bookAt: '',
  });

  // Update booking.tourName when title changes
  useEffect(() => {
    if (title) {
      setBooking(prev => ({ ...prev, tourName: title }));
    }
  }, [title]);

  const [tourRating, setTourRating] = useState(null);

  const handleChange = e => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setBooking(prevState => ({ ...prevState, [e.target.id]: value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please sign in');
        return;
      }

      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(booking),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || 'Booking failed.');
        return;
      }

      console.log('Booking successful:', result.data);
      alert('Booking successful!');
    } catch (error) {
      console.error('Error during booking:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsRef.current ? reviewMsRef.current.value : '';

    if (!user) {
      alert('Please sign in');
      return;
    }

    try {
      const reviewObj = {
        name: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/tours/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.error || 'Something went wrong. Please try again.');
        return;
      }

      console.log(result.data);
      alert('Review submitted successfully!');
      if (reviewMsRef.current) reviewMsRef.current.value = '';
      setTourRating(null);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const totalAmount = Number(price) * booking.guestSize + services;

  return (
    <section>
      <Container>
        <Row>
          {loading && <h4>Loading...</h4>}
          {error && <h4>{error}</h4>}

          {!loading && !error && (
            <Col lg="8">
              <div className="tourContent">
                <img src={photo} alt={title} style={{ width: '100%' }} />
                <Form className="form-frame">
                  <div className="tourInfo">
                    <h2>{title}</h2>
                    <div className="detail">
                      <div className="inndet">
                        <span className="tour_rating d-flex align-items-center gap-1">
                          <FaStar style={{ marginRight: '3px', color: '#f7994c' }} />
                          {avgRating === 0 ? null : avgRating}
                          {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>}
                        </span>
                        <span>
                          <MdEditLocation style={{ fontSize: '20px', marginRight: '3px' }} />
                          {address}
                        </span>
                      </div>
                      <div className="extraDetail">
                        <span>
                          <MdEditLocation style={{ fontSize: '20px', marginRight: '3px' }} />
                          {city}
                        </span>
                        <span>
                          <MdAttachMoney style={{ fontSize: '20px', marginRight: '3px' }} />
                          {price} /per person
                        </span>
                        <span>
                          <IoPeopleSharp style={{ fontSize: '20px', marginRight: '3px' }} />
                          {maxGroupSize} person
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="description">
                    <h2>Description</h2>
                    <span>{desc}</span>
                  </div>
                </Form>

                {/* Reviews Form */}
                <Form className="form-frame" onSubmit={submitHandler}>
                  <div className="tourInfo">
                    <h2>Reviews ({reviews.length})</h2>
                  </div>
                  <div className="ratingGroup">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setTourRating(num)}
                        style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}
                      >
                        {num} <FaStar style={{ marginRight: '3px', color: '#f7994c' }} />
                      </button>
                    ))}
                  </div>
                  <div className="inputReview">
                    <input type="text" placeholder="Share your thought" ref={reviewMsRef} />
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>

                {/* Reviews List */}
                <Form className="form-frame">
                  <ListGroup className="userReviews">
                    {reviews.map(review => (
                      <ListGroupItem
                        key={review._id}
                        className="reviewsItem"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={avatar} alt="avatar" style={{ width: '40px', marginRight: '10px' }} />
                          <div>
                            <h5>{review.name}</h5>
                            {review.createdAt && (
                              <p style={{ marginTop: '-3px', fontSize: '13px' }}>
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            )}
                            <p>{review.reviewText}</p>
                          </div>
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          {review.rating} <FaStar style={{ marginRight: '3px' }} />
                        </span>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Form>
              </div>
            </Col>
          )}

          {/* Booking Form */}
          <Col lg="4">
            <Form className="form-frame">
              <div
                className="tourPrice"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}
              >
                <span style={{ display: 'flex' }}>
                  <h3>${price}</h3> /per person
                </span>
                <span className="tour_rating d-flex align-items-center gap-1">
                  <FaStar style={{ marginRight: '3px', color: '#f7994c' }} />
                  {avgRating === 0 ? null : avgRating}
                  {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>}
                </span>
              </div>
              <br />
              <ListGroup style={{ padding: '10px' }} className="booking">
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
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
                        min={1}
                        required
                      />
                    </div>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 px-0" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ fontWeight: 'lighter', fontSize: '15px' }}>
                      ${price} <i className="ri-close-line"></i> 1 person
                    </h5>
                    <span>${price}</span>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 px-0" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ fontWeight: 'lighter', fontSize: '15px' }}>Service charge</h5>
                    <span>${services}</span>
                  </ListGroupItem>
                  <ListGroupItem className="border-0 px-0 total" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ fontSize: '15px' }}>Total</h5>
                    <span>${totalAmount}</span>
                  </ListGroupItem>

                  <Button
                    type="submit"
                    style={{
                      margin: '10px',
                      width: '90%',
                      borderRadius: '20px',
                      backgroundColor: '#f7994c',
                      border: 'none',
                    }}
                  >
                    Book now
                  </Button>
                </Form>
              </ListGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;
