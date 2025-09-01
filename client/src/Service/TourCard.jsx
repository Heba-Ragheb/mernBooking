import React from 'react'
import Button from 'react-bootstrap/Button';
import { Card, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiMapPinLine, RiStarFill } from 'react-icons/ri';
import './Services.css'
import calculateAvg from './Utile'

const TourCard = ({ tour }) => {
  const { _id, title, photo, price, featured, reviews, city } = tour
  const { totalRating, avgRating } = calculateAvg(reviews)
  return (
    <div className='card' style={{ maxWidth: "150px" }} >
      <Card style={{ width: '18rem' }}>
        <div className="tourImg">
          <img src={photo} />
          <span>featured</span>
        </div>
        <CardBody>
          <div className="card_top d-flex align-items-centerjustify-content-between">
            <span className="tour_ location d-flex align-items-center gap-1">
              <i class="ri-map-pin-line"></i> {city}
            </ span>
            <span className="tour_ rating d-flex align-items-center gap-1">
              <i class="ri-star-fill"></i> {avgRating}{" "}
              <span>({reviews.length})</span>
            </span>
          </div>



          <h5 className="tour_title"><Link to={`/tours/${_id}`}>{title}</Link></h5>
          <div className="card_bottom d-flex align-items-center
justify-content-between mt-3">
            <h5>${price} <span> /per person</ span></h5>
            <Button className="btn booking__btn">
              <Link to={`/tour/${_id}`}>Book Now</ Link>
            </Button>
          </div>

        </CardBody></Card>

    </div>
  )
}

export default TourCard