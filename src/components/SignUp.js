import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function SignUp() { // Set your error message here if needed
    const [errorMsg, setErrorMsg] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [navigatex, setNavigatex] = useState('');
    const [account, setAccount] = useState({
        id: 0,
        username: "",
        password: "",
        phone: "",
        loyalcus: 0,
        role: 0
    });
    const navigate = useNavigate();
    const [allaccount, setAllaccount] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9998/account")
            .then(res => {
                //kiem tra kieu du lieu
                console.log(res?.data)
                // set lai data
                setAllaccount(res?.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (allaccount.some(accountall => accountall.username == account.username)) {
            alert("Username đã tồn tại !");
            setNavigatex("./signup")
        } else if (rePassword != account.password) {
            alert("Mật khẩu nhập lại không khớp !");
            setNavigatex("./signup")
        } else {
            axios.post("http://localhost:9998/account", account)
                .then(res => {
                    console.log(res)
                    alert('Create user successfully');
                    window.location.href = "./login"; 
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://digital.ihg.com/is/image/ihg/hotel-indigo-berlin-6849001322-2x1" className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit} action={navigatex}>
                                <div className="divider d-flex align-items-center my-4">
                                    <h3 className="text-center fw-bolder mx-3 mb-0">Đăng kí tài khoản</h3>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="username">Tên tài khoản (Username): </label>
                                    <input required type="text" id="username" name="username" value={account.username} className="form-control form-control-lg"
                                        onChange={(event) => {
                                            setAccount({
                                                ...account,
                                                username: event.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="password">Mật khẩu (Password)</label>
                                    <input required type="password" id="password" value={account.password} name="password" className="form-control form-control-lg"
                                        onChange={(event) => {
                                            setAccount({
                                                ...account,
                                                password: event.target.value
                                            })
                                        }} />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="password">Nhập lại mật khẩu (RePassword)</label>
                                    <input required type="password" id="password" name="password" className="form-control form-control-lg"
                                        onChange={(event) => {
                                            setRePassword(event.target.value)
                                        }} />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="password">Số điện thoại (Phone)</label>
                                    <input required type="text" pattern="[0-9]\d*" value={account.phone}  id="password" name="password" className="form-control form-control-lg"
                                        onChange={(event) => {
                                            setAccount({
                                                ...account,
                                                phone: event.target.value
                                            })
                                        }} />
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mb-0">
                                        {errorMsg && <div style={{ color: "red" }} className="error">{errorMsg}</div>}
                                    </div>

                                </div>
                                <div className="text-center text-lg-start mt-1 pt-2">
                                    <button className="btn btn-primary btn-lg text-white"  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Đăng ký</button>
                                    <button className="btn btn-primary btn-lg text-white" style={{ marginLeft: "10px" }} >< Link to="/login" style={{ textDecoration: "none", color: "white" }}>Đăng nhập</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}