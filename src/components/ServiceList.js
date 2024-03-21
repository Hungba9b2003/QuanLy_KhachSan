import { useEffect, useState } from "react";
import "./serviceList.css";
import axios from "axios";

const Service = () => {
  const [service, setService] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9998/service")
      .then(res => {
        //kiem tra kieu du lieu
        console.log(res?.data)
        // set lai data
        setService(res?.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div className="pList">
      {service?.map((service => {
        return (
          <div className="pListItem">
            <img
              src={service.imgservice}
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>{service.name}</h1>
              <h2>{service.price}$</h2>
            </div>
          </div>
        )
      }))}
    </div>
  );
};

export default Service;
