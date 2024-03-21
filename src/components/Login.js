import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() { // Set your error message here if needed
    const [errorMsg, setErrorMsg] = useState('');
    const [account, setAccount] = useState({
        id: 0,
        username: "",
        password: "",
        Phone: 0,
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

    const handleSubmit = () => {
        const foundAccount = allaccount.find(a => a.username === account.username && a.password === account.password);
        if (foundAccount) {
            // If the account exists, redirect to the homepage\
            localStorage.setItem("userid",allaccount.find(a => a.username === account.username && a.password === account.password).id)
            navigate("/");
        } else {
            // If the account doesn't exist, display an error message
            setErrorMsg('Tên tài khoản hoặc mật khẩu không đúng.');
            navigate("/login");
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
                            
                                <div className="divider d-flex align-items-center my-4">
                                    <h3 className="text-center fw-bolder mx-3 mb-0">Đăng nhập</h3>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="username">Tên tài khoản (Username): </label>
                                    <input type="text" id="username" name="username" className="form-control form-control-lg"
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
                                    <input type="password" id="password" name="password" className="form-control form-control-lg"
                                        onChange={(event) => {
                                            setAccount({
                                                ...account,
                                                password: event.target.value
                                            })
                                        }} />
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mb-0">
                                        {errorMsg && <div style={{color:"red"}} className="error">{errorMsg}</div>}
                                    </div>
                                    <a href="#!" className="text-body">Quên mật khẩu?</a>
                                </div>
                                <div className="text-center text-lg-start mt-1 pt-2">
                                    <button className="btn btn-primary btn-lg text-white" onClick={handleSubmit} style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Đăng nhập</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Chưa có tài khoản? <a href="/signup" className="link-danger">Đăng ký</a></p>
                                </div>                 
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}