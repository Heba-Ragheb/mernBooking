import React, { useEffect, useState } from 'react'
import './page.css'
import { Container,Row ,Col} from 'react-bootstrap'
import Search from "../component/Search/Search"
import tourData from "../assets/data/tours"
import FeaturesToures from '../component/FeaturedTours/FeaturesToures'
import TourCard from '../Service/TourCard'
import useFetch from '../Hocks/useFetch';

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('BASE_URL:', process.env.REACT_APP_BASE_URL);
const Tours = () => {

    const [pagecount, setPageCount] = useState(0)
const [page, setPage]= useState(0);
const{data:tours ,loading,error}=useFetch(`${BASE_URL}/tours?page=${page}`)
const{data:tourCount}=useFetch(`${BASE_URL}/tours/search/count`)
useEffect(() =>{
const pages = Math.ceil(tourCount / 8); //later we will use backe
setPageCount(pages);
}, [page,tourCount,tours]);
  return (
    <div>
        <section>
            <div className="allTour">
                <h1>
                    All Tours
                </h1>
            </div>
        </section>
        <section style={{marginTop:"50px"}}>
            <Container>
                <Row>
                 <Search/>
                </Row>
            </Container>

        </section>
        <section style={{marginTop:"50px"}}>
            <Container>
            {loading&& <h4>.........loading....</h4>}
      {error&& <h4>{error}</h4>}
    { !loading && !error&&   <Row>
                { tours?.map((tour) => (
            <Col lg="3" key={tour.id}>
              <TourCard tour={tour} />
              </Col>))}
                 <Col lg="12">
<div className="pagination d-flex align-items-center
justify-content-center mt-4 gap-3">
{[...Array(pagecount).keys()].map(number=>(
<span key={number} onClick={()=> setPage(number)}>
{number + 1}
</span>
))}
</div>
</Col>

                </Row>}
            </Container>
           
            
        </section>
    </div>
  )
}


export default Tours