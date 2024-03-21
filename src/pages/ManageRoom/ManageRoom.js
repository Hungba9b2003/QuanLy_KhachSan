import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Navbar from "../../components/Navbar";
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { type } from '@testing-library/user-event/dist/type';
export default function ManageRoom() {
    const [rooms, setRooms] = useState([]);
    const [typeRoom, setTypeRooms] = useState([]);
    const [booking, setBooking] = useState([]);
    const [account, setAccount] = useState([]);
    const [filtertype, setFiltertype] = useState({});
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
    useEffect(() => {
        axios.get("http://localhost:9998/account")
            .then(res => {
                //kiem tra kieu du lieu
                console.log(res?.data)
                // set lai data
                setAccount(res?.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <Navbar />
            <Header type="list" />

            <div className='container'>
                <h1>Booking</h1>
                <Table striped bordered responsive hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên Phòng</th>
                            <th>Loại Phòng</th>
                            <th>Giá phòng</th>
                            <th>Ngày nhận phòng</th>
                            <th>Ngày trả phòng</th>
                            <th>Tên người thuê</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>

                        {booking?.map((booking => {
                            return (
                                <tr>
                                    <td>{booking.id}</td>
                                    {rooms?.map((room => {
                                        if (room.id == booking.id) {
                                            return (
                                                <>
                                                    <td>{room.name}</td>
                                                    {
                                                        typeRoom?.map((type => {
                                                            if (type.id === room.typeroom)
                                                                return (
                                                                    <>
                                                                        <td>{type.name}</td>
                                                                        <td>{type.price}$</td>
                                                                    </>
                                                                )
                                                        }))
                                                    }
                                                </>
                                            )
                                        }
                                    }))}

                                    <td>{booking.checkindate}</td>
                                    <td>{booking.checkoutdate}</td>
                                    {account?.map((accountx => {
                                        if (accountx.id == booking.accountid) {
                                            return (
                                                <><td>{accountx.username}</td></>)
                                        }
                                    }))}
                                    <td>{booking.bill}$</td>
                                </tr>)
                        }))}
                    </tbody>
                </Table>
                <h1>Phòng</h1>
                <Table striped bordered responsive hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên Phòng</th>
                            <th>Tình trạng</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {rooms.map((room => {
                                return(
                                    <>
                                    <tr>
                                    <td>{room.id}</td>
                                    <td>{room.name}</td>
                                    {booking.some(bookingItem => bookingItem.roomid == room.id) ? (
                                        <td style={{color:"red"}}>Hết phòng</td>
                                    ) : (
                                        <td style={{color:"green"}}>Còn phòng</td>
                                    )}
                                    </tr>
                                </>
                                )
                            }))}
              
                    </tbody>
                </Table>

            </div>
        </div>

    )
}
