import React, { useState } from 'react'
import {Col,Row,Container, Button} from 'react-bootstrap'
import TourCard from '../Service/TourCard';
import { useLocation } from 'react-router-dom'; 
import male from '../assets/images/male-tourist.png'
import './page.css'
const SearchResult = () => {
    const location = useLocation()
    const [data] = useState(location.state)
    //const[data] = useState(location.state)
    console.log(data)
  return (
    <div> <section>
    <div className="allTour">
        <h1>
            Tours Search Result
        </h1>
    </div>
</section>
 <Container>
  <Row>
   {data.length==0?(<h4>no tour found</h4>):(data?.map(tour=>( <Col lg="3" key={tour._id}>
              <TourCard tour={tour} />
            </Col>)))}
  </Row>
 </Container>
 <section  style={{ marginTop: "70px",backgroundColor:"rgb(150, 189, 240)" }}>
          
 <Container>
              <Row style={{alignItems:"center"}}> 
                <Col>
                <h2>
                  Subscribe noe to get useful traveling information
                </h2>
                <div className="" style={{display:"flex ",justifyContent:"space-between",backgroundColor:"white",borderRadius:"30px",margin:"20px"}}>
                  <input type='email' placeholder='Enter your email' style={{textDecoration:"none",border:"none" ,marginLeft:"20px"}}/>
                  <Button style={{backgroundColor:"white",color:"black",border:"none",marginRight:"10px"}}>Subscribe</Button>
                </div>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quas aliquam, hic tempora inventore suscipit unde
                
                </p>
                </Col>
                <Col>
                <img src={male} style={{width:"500px"}}/>
                </Col>
              </Row>
            </Container></section>
</div>
  )
}

export default SearchResult