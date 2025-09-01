import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css';
import './page.css'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
//client\src\assets\images\experience.png
import exp from '../assets/images/experience.png'
import Search from "../component/Search/Search"
import male from '../assets/images/male-tourist.png'
import world from '../assets/images/world.png'
import ServicesList from '../Service/ServicesList';
import FeaturesToures from '../component/FeaturedTours/FeaturesToures';

import Masonory from './MasonryImg';
import { Button } from 'react-bootstrap';
const Home = () => {
  return (
    <div>
      <section>
        <Container >
          <Row >
            <Col lg='6' >
              <div className="heroContent" style={{}}>
                <div className="sub" style={{ display: "flex", marginBottom: "10px" }}> <div className="subTit" style={{ backgroundColor: "#f7994c", color: "white", borderRadius: "20px", paddingRight: "10px", paddingLeft: "10px" }}>
                  Knoe Before You Go
                </div>
                  <img src={world} style={{ width: "30px" }} />
                </div>
                <h1 className="mb-4">Traveling opens the door to creating <span style={{ color: "#f7994c" }}>memories</span></h1>
                <p className="lead mb-5" style={{ fontSize: "15px" }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ipsum nobis asperiores soluta
                  voluptas quas voluptates. Molestiae tempora dignissimos, animi praesentium molestias
                  perferendis porro expedita delectus. Soluta natus porro.
                </p></div>
            </Col>

            <Col lg='2' >
              <div className="heroImg1" >
                <img src="images/hero-img01.jpg" /></div>
            </Col>
            <Col lg='2' >
              <div className="heroImg1" style={{ marginTop: "20px" }}>

                <video src="images/hero-video.mp4" /></div> </Col>
            <Col lg='2' >
              <div className="heroImg1" style={{ marginTop: "40px" }}>
                <img src="images/hero-img02.jpg" /></div></Col>
          </Row>
        </Container>
      </section>
      <section><Search /></section>

      <section style={{ marginTop: "70px" }}>
        <Container>
          <Row>
            <Col lg="3" >
              <div className="" style={{ background: "#f7994c", borderRadius: "10px", width: "70%" }}>
                <h5 className='what' style={{ color: "white", padding: "5px" }}>what we services</h5>
              </div> <h2 style={{ fontWeight: "lighter" }}>we offer our best serves</h2>
            </Col>
            <Col lg="9">
              <ServicesList /></Col>
          </Row>
        </Container>
      </section>
      <section style={{ marginTop: "70px" }}>
        <Container>
          <Row>
            <Col >
              <FeaturesToures /></Col>
          </Row>
        </Container>
      </section>
      <section  style={{ marginTop: "70px" }}>
        <Container>
          <Row>
            <Col lg="6">

              <div className="experience_content">
                <div className="subTit" style={{ backgroundColor: "#f7994c", color: "white", borderRadius: "20px", paddingRight: "10px", paddingLeft: "10px", width: "30%" }}>
                  Experience
                </div>


                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  <br />
                  Quas aliquam, hic tempora inventore suscipit unde
                </p></div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</ span>
                  <h6>Successfull Trip</h6>
                  </div>
                  <div className="counter__box">
                  <span>2k+</ span>
                  <h6>Regular client</h6>
                  </div>
                  <div className="counter__box">
                  <span>15</ span>
                  <h6>Years of Expriences</h6>
                  </div>

                  </div>
                </Col>
                <Col lg="6">
                <img src={exp} style={{width:"450px" ,marginLeft:"30px"}}/>
                </Col></Row>
            </Container>
          </section>
          <section  style={{ marginTop: "70px" }}>
            <Container>
              <Row>
    <Col style={{marginBottom:"20px"}}>
    <div className="subTit" style={{ backgroundColor: "#f7994c", color: "white", borderRadius: "20px", paddingRight: "10px", padding: "10px", width: "10%" }}>
                 gallary
                </div>
                <h5>
               visit our customer tour gallary
                </h5>
    </Col>
                <Col lg="12">
                <Masonory/>
                </Col>
              </Row>
            </Container>
          </section>
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
            </Container>
          </section>
          <section style={{ marginTop: "70px" }}></section>
        </div>
        )
}

        export default Home