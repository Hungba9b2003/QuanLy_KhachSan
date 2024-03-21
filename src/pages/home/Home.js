import RoomType from "../../components/RoomType";
import Service from "../../components/ServiceList";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import PropertyList from "../../components/FeaturedProperties";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Type of room</h1>
        <RoomType/>
        <Link to="/hotels" style={{ textDecoration: "none" }}><div className="btn btn-success"style={{ textAlign: "center", justifyContent:"center" }}><h1>Đặt phòng ngay !</h1></div></Link>
        <h1 className="homeTitle">All service</h1>
        <Service />
        <h1 className="homeTitle">Homes guests love</h1>
        <PropertyList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
