import React from 'react'
import './Services.css'

const Services = ({item}) => {
  const {imgUrl,title,desc} = item
  return (
   <div className="sevicesItem">
    <div className="seviceImg">
      <img src={imgUrl} style={{color:"#f7994c" }}/>
    </div>
    <h5 style={{fontSize:"17px"}}>{title}</h5>
    <p style={{fontSize:"12px"}}>{desc}</p>
   </div>
  )
}

export default Services