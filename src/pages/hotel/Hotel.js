import "./hotel.css";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Hotel = () => {
  const { id } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [roomdetail, setRoomdetail] = useState({});
  const [typeroom, setTyperoom] = useState({});
  const [day, setDay] = useState(1);
  const [bill, setBill] = useState(0);
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(new Date()); 
  const [billdefault,setBilldefault] = useState(0);
  useEffect(() => {
    if (roomdetail.typeroom) {
      axios.get(`http://localhost:9998/typeroom/${roomdetail.typeroom}`)
        .then(res => {
          setTyperoom(res?.data);
          setBill(res?.data.price);
          setBilldefault(res?.data.price);         
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [roomdetail.typeroom]);
  const [booking, setBooking] = useState({
    accountid: localStorage.getItem("userid"),
    roomid: id,
    quantityday: 1,
    checkindate: new Date().toISOString().slice(0, 10),
    checkoutdate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().slice(0, 10),
    bill: bill
  })

  const handleDayChange = (e) => {
    const newDay = parseInt(e.target.value); // Parse the input value to an integer
    const newBill = newDay * typeroom.price; // Calculate the new bill based on the new day
    // Tạo một đối tượng Date mới dựa trên `checkout` hiện tại
    const newCheckout = new Date();
    newCheckout.setDate(newCheckout.getDate() + newDay);
    setBill(newBill);  
    // Update the state with the new values
    setBooking(prevBooking => ({
        ...prevBooking,
        quantityday: newDay,
        checkoutdate: newCheckout.toISOString().slice(0, 10), // Lấy ngày của checkout,
        bill: newBill
    }));
    
};
  useEffect(() => {
    axios.get(`http://localhost:9998/room/${id}`)
      .then(res => {
        setRoomdetail(res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  

  const photos = [
    {
      src: typeroom.imgroom,
    },
    {
      src: typeroom.imgroom1,
    },
    {
      src: typeroom.imgroom2,
    },
    {
      src: typeroom.imgroom3,
    },
    {
      src: typeroom.imgroom4,
    },
    {
      src: typeroom.imgroom5,
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
  const handleBooking = () => {
    if (!localStorage.getItem("userid")) {
      // Nếu là null, chuyển hướng đến trang đăng nhập
      navigate("/login");
      return;
    } else {
      axios.post(`http://localhost:9998/booking`, booking)
        .then(res => {
          navigate("/manage")
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">Room ID{roomdetail.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Ha Noi</span>
          </div>
          <span className="hotelDistance">
            Type Room : {typeroom.name}
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over <b>{typeroom.price}$</b> at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków–Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Quantity day want to booking</h1>
              <p>Enter day: <input onChange={handleDayChange} name="daybooking" placeholder="1" defaultValue={1} type="number" min={1} max={200}></input></p>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>Total: {bill}$</b> ({day} day)
              </h2>
              <button onClick={handleBooking}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
