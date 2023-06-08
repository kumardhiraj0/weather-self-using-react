import React, { useState } from "react";
import axios from "axios";
import "./weather.css";
import search from "../images/search.png";
import cloud1 from "../images/cloud1.jpg";
import humidity from "../images/humadity.jpg";
import wind from "../images/wind.png";
import clear from "../images/clear.png";
import rain from "../images/rain.png";
import drizzle from "../images/drizzle.png";
import mist from "../images/mist.jpg";
import haze from "../images/drizzle.png";
const Weather = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image:cloud1,
    main:""
  });
  const [name, setName] = useState("");
  const [error,setError] = useState("");
  const handleClick = () => {
    if (name !== "") {
      const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=f50413cae54063b3a3fd15729e5995c8&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log(res.data);
          let imagePath = "";
          if(res.data.weather[0].main === "Clouds"){
            imagePath = cloud1;
          }else if(res.data.weather[0].main === "Clear"){
            imagePath = clear
          }else if(res.data.weather[0].main === "Rain"){
            imagePath = rain
          }else if(res.data.weather[0].main === "Drizzle"){
            imagePath = drizzle
          }else if(res.data.weather[0].main === "Mist"){
            imagePath = mist
          }else if(res.data.weather[0].main === "Haze"){
            imagePath = haze
          }
          else{
            imagePath = cloud1;
          }
          setError("");
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image:imagePath,
            main:res.data.weather[0].main
          });
         
        })
        .catch((err) => {
            if(err.response.status=== 404){
                setError("Invalid City Name");
            }else{
                setError("");
            }
            console.log(err)
        });
    }
  };
  return (
    <>
      
      <div className="container">
        <div className="weather">
          <div className="search">
            <input
              type="text"
              placeholder="Enter city Name.."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button>
              <img src={search} alt="search" onClick={handleClick} />
            </button>
          </div>
          <div className="error">
            <p>{error}</p>
          </div>
          <div className="winfo">
            <img src={data.image} alt="cloud" className="icon" />
            <p>{data.main}</p>
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
            <div className="details">
              <div className="col">
                <img src={humidity} alt="humidity" />
                <div className="humidity">
                  <p>{Math.round(data.humidity)}%</p>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="col">
                <img src={wind} alt="wind" />
                <div className="wind">
                  <p>{Math.round(data.speed)} km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;
