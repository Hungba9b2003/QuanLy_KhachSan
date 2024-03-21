import { useEffect, useState } from "react";
import "./roomtype.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery'; // Import jQuery here
import Carousel from 'react-bootstrap/Carousel';
import axios from "axios";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
function chunkArray(array, size) {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
}
const RoomType = () => {
  const [typeroom, setTyperoom] = useState([])
  useEffect(() => {
    axios.get("http://localhost:9998/typeroom")
      .then(res => {
        //kiem tra kieu du lieu
        console.log(res?.data)
        // set lai data
        setTyperoom(res?.data)

      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
      <div className="featured" style={{ backgroundColor: 'rgba(169,169,169,0.5)', backdropFilter: 'blur(5px)' }}>
        {/* {typeroom.map(room => (
        <div className="featuredItem" key={room.id}>
          <img src={room.imgroom} alt="" className="featuredImg" />
          <div className="featuredTitles">
            <h1>{room.name}</h1>
            <h6>{room.bedquantity} beded</h6>
            <h6>Size room: {room.size}</h6>
            <h6>description: {room.description}</h6>
          </div>
        </div>
      ))} */}
        <Carousel style={{ width: '100%', maxHeight: '500px', overflow: 'hidden' }}>
          {typeroom.map(room => (
            <Carousel.Item > {/* Ensure each Carousel.Item has a unique key */}

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>
                <img src={room.imgroom} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'cover' }} alt={room.name} />
                <Carousel.Caption style={{ width: '50%', backgroundColor: 'rgba(169,169,169,0.5)', backdropFilter: 'blur(5px)', padding: '20px' }}>
                  <h1>{room.name}</h1>
                  <h6>{room.bedquantity} beded</h6>
                  <h6>Size room: {room.size}</h6>
                  <h6>Description: {room.description}</h6>
                </Carousel.Caption>
              </div>

            </Carousel.Item>
          ))}
        </Carousel>
      
    </div>
    
  );
};

export default RoomType;