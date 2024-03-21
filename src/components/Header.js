import {
  faBed,
  faCalendarDays,
  faCar,
  faClipboard,
  faList,
  faPen,
  faPerson,
  faPlane,
  faStar,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
        
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faClipboard} />
            <span><Link to="/manage" style={{ textDecoration: "none",color:"white" }}>Manage Room</Link></span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPen} />
            <span><Link to="/hotels" style={{ textDecoration: "none",color:"white" }}>Booking Room </Link></span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faStar} />
            <span>Service</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="headerBtn">Sign in / Register</button>
            </Link>          
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
