import React from 'react';
import TourCard from '../../Service/TourCard';
import { Col, Container, Row } from 'react-bootstrap';
import useFetch from '../../Hocks/useFetch';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const FeaturesToures = () => {
  console.log('BASE_URL:', BASE_URL);

  const { data: featuredTours, error, loading } = useFetch(`${BASE_URL}/tours/search/getFeatueredTour`);

  console.log('Featured tours:', featuredTours);

  return (
    <div>
      {loading && <h4>Loading...</h4>}
      {error && <h4>{error}</h4>}
      {!loading && !error && (
        <Container>
          <Row className="g-3">
            {featuredTours?.map((tour) => (
              <Col lg="3" key={tour._id || tour.id}>
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default FeaturesToures;