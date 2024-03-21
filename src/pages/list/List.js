import "./list.css";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [rooms, setRooms] = useState([]);
  const [roomsS, setRoomsS] = useState([]);
  const [typeRoom, setTypeRooms] = useState([]);
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9998/booking")
      .then(res => {
        //kiem tra kieu du lieu
        console.log(res?.data)
        // set lai data
        setBooking(res?.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios.get("http://localhost:9998/room")
      .then(res => {
        //kiem tra kieu du lieu
        console.log(res?.data)
        // set lai data
        setRooms(res?.data)
        setRoomsS(res?.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios.get("http://localhost:9998/typeroom")
      .then(res => {
        //kiem tra kieu du lieu
        console.log(res?.data)
        // set lai data
        setTypeRooms(res?.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const searchByType = (type) => {
    let filteredRooms;
    if (type === "") {
      filteredRooms = roomsS;
    } else {
      filteredRooms = roomsS.filter(room => room.typeroom === type);
    }
    setRooms(filteredRooms);
  };
  const searchPriceMin = (e) => {
    let filteredRooms;
    let typeroomS;
    if (e.target.value <= 0) {
      filteredRooms = roomsS;
    } else {
      typeroomS = typeRoom.filter(type => type.price >= e.target.value)
      filteredRooms = roomsS.filter(room => typeroomS.some(type => room.typeroom == type.id));
    }
    setRooms(filteredRooms);
  }
  const navigate = useNavigate();
  const searchPriceMax = (e) => {
    let filteredRooms;
    let typeroomS;
    if (e.target.value <= 0) {
      filteredRooms = roomsS;
    } else {
      typeroomS = typeRoom.filter(type => type.price <= e.target.value);
      filteredRooms = roomsS.filter(room => typeroomS.some(type => room.typeroom == type.id));
    }
    setRooms(filteredRooms);
  }
  const navigateToHotel= (id) =>{
    navigate(`/hotels/`+id)
  } 
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
            </div>
            <div >
              <h6>TypeRoom</h6>
              <input type="radio" name="typeroom" onClick={() => searchByType("")}></input> All
              <br></br>
              {typeRoom?.map((type => {

                return (
                  <>
                    <input type="radio" name="typeroom" onClick={() => searchByType(type.id)}></input> {type?.name}
                    <br></br>
                  </>
                )
              }))}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per day</small>
                  </span>
                  <input type="number" step={10} className="lsOptionInput" onChange={searchPriceMin} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per day</small>
                  </span>
                  <input type="number" step={10} className="lsOptionInput" onChange={searchPriceMax} />
                </div>
              </div>
            </div>
          </div>
          <div className="listResult">
            <div>
              {rooms?.map((room => {
                if (!booking.some(bookingItem => bookingItem.roomid == room.id)) {
                  return (
                    <div className="searchItem">
                      {typeRoom?.map((type => {
                        if (room.typeroom === type.id) {
                          return (
                            <img
                              src={type.imgroom}
                              alt=""
                              className="siImg"
                            />
                          )
                        }
                      }))}
                      <div className="siDesc">
                        <h1 className="siTitle">ID Room : {room.name}</h1>
                        <span className="siDistance">500m from center Hanoi</span>
                        <span className="siTaxiOp">Free airport taxi</span>
                        {typeRoom?.map((type => {
                          if (room.typeroom === type.id) {
                            return (
                              <>
                                <span className="siSubtitle">
                                  Type Room: {type.name}
                                </span>
                                <span className="siFeatures">
                                  Description: {type.description}
                                </span>
                                <span className="siCancelOp">Free cancellation </span>
                                <span className="siCancelOpSubtitle">
                                  You can cancel later, so lock in this great price today!
                                </span>

                                <div className="siDetails">
                                  <div className="siRating">
                                    {/* <span>Excellent</span>
                <button>8.9</button> */}
                                  </div>
                                  <div className="siDetailTexts">
                                    <span className="siPrice">Price/Day: {type.price}$</span>
                                    <span className="siTaxOp">Includes taxes and fees</span>
                                    <button className="siCheckButton" onClick={() => navigateToHotel(room.id)}>See availability</button>
                                  </div>
                                </div>
                              </>
                            )
                          }
                        }))}
                      </div>
                    </div>
                  )
                }
              }))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
