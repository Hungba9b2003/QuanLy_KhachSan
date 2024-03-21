import { Link } from "react-router-dom"
import "./navbar.css"
import "./header.css"
const Navbar = () => {
  const isLoggedIn = localStorage.getItem('userid') !== null;
  return (
    <div className="navbar" >
      <div className="navContainer" >
        <span className="logo">< Link to="/" style={{ textDecoration: "none",color:"white" }}>HotelBooking</Link></span>
        <div className="navItems header">
          {isLoggedIn ? (
            <button className="navButton" onClick={() => { localStorage.removeItem('userid'); window.location.reload(); }}>Logout</button>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>           
                <button className="navButton">Register</button>
              </Link>     
              <Link to="/login" style={{ textDecoration: "none" }}>           
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>

    </div>
  )
}

export default Navbar