/**import React from 'react'
import data from '../../assets/data/tours'
import TourCard from '../../Service/TourCard'
import { Col, Container, Row } from 'react-bootstrap'
import useFetch from '../../Hocks/useFetch'
import { BASE_URL } from '../../Service/Config'
const FeaturesToures = () => {
  const {data:FeaturesToures} = useFetch(`${BASE_URL}/search/getFeatueredTour`)
  return (
    <div>
        <Container>
            <Row gutter={3}> 
        {data?.map(tour=>(
            <Col lg ='3' key={tour.id}>
              <TourCard tour ={tour}/>
            </Col>
        ))}</Row>
        </Container>
    </div>
  )
}

export default FeaturesToures*/import React from 'react';
import data from '../../assets/data/tours';
import TourCard from '../../Service/TourCard';
import { Col, Container, Row } from 'react-bootstrap';
import useFetch from '../../Hocks/useFetch';
import { BASE_URL } from '../../Service/Config';

const FeaturesToures = () => {
 // const { data: featuredTours, error, loading } = useFetch(`${BASE_URL}/search/getFeatuerdTour`);
  const { data: featuredTours, error, loading } = useFetch(`${BASE_URL}/tours/search/getFeatueredTour`);
 

  return (
    <div>
      {loading&& <h4>.........loading....</h4>}
      {error&& <h4>{error}</h4>}
    { !loading && !error&&  <Container>
        <Row gutter={3}>
         { featuredTours?.map((tour) => (
            <Col lg="3" key={tour.id}>
              <TourCard tour={tour} />
            </Col>
          ))}
        </Row>
      </Container>}
    </div>
  );
};

export default FeaturesToures;