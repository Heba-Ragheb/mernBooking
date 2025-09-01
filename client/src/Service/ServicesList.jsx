import React from 'react'
import weather from '../assets/images/weather.png'
//C:\Users\User1\OneDrive\Documents\Important\fullBooking\client\src\assets\images\weather.png
import guide from '../assets/images/guide.png'
import customization from '../assets/images/customization.png'
import { Col, Container, Row } from 'react-bootstrap'
import Services from './Services'
import './Services.css'
//client\src\assets\images\customization.png

    const sevicesData =[
        {
            imgUrl:weather,
            title:"Calculate the weather",
            desc:" Lorem ipsum dolor sit amett. Ullam s solutavoluptas quas voluptates. Molestiae , animi"
        },
        {
            imgUrl:guide,
            title:"Best Tour Guide",
            desc:" Lorem ipsum dolor sit amett. Ullam s solutavoluptas quas voluptates. Molestiae , animi "
        },
        {
            imgUrl:customization,
            title:"customization",
            desc:" Lorem ipsum dolor sit amett. Ullam s solutavoluptas quas voluptates. Molestiae , animi"
        }
    ]
    const ServicesList = () => {
  return (
    <div>
        <Container>
            <Row>
        {
            
            sevicesData.map((item,index)=>(
                <Col lg="4" key={index}>
                    <Services item={item}/>
                </Col>
            ))
        }</Row>
        </Container>
    </div>
  )
}

export default ServicesList