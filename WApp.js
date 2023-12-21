//import { response } from "express";
import { useState, useContext, useEffect } from "react";
//import { Link } from "react-router-dom";
import Widget from "./Widget";
import WHeader from "./WHeader";
import WSearch from "./WSearch";
import { MyContext } from "./Contextor";
import "./style.css";

function convDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    return hours + 'h:' + minutes.substr(-2) + '' /*+ seconds.substr(-2)*/;
}

function WApp(props) {
    const [lat, setLat] = useState([])
    const [long, setLong] = useState([])
    const [currentWeather, setCurrentWeather] = useState([]);
    const [forecat, setForecast] = useState([null]);
    const imagesUrl = "https://openweathermap.org/img/w";

    const [query,setQuery] = useState("")

    const updateQuery = (event)=>{
        setQuery(event.target.value)
    }
    let userLocation = query !== "" ?"q="+query:"lat=14.75&lon=-17.30";
    const handleSubmit = (event)=>{
        event.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=a6e9e8c1daae5ca1e696b38868847d44&${userLocation}&aqi=yes&units=metric&lang=fr`)
            .then(res => res.json())
            .then(result => {
                setCurrentWeather(result);
                //   setQuery('');
                console.log(result);
            });
        fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=a6e9e8c1daae5ca1e696b38868847d44&${userLocation}&aqi=yes&cnt=3&units=metric&lang=fr`)
            .then(res => res.json())
            .then(result => {
                setForecast(result)
                console.log(result);
            });
    }

    useEffect(() => {
        const getData = async () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                }
            )
        }
        

        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=a6e9e8c1daae5ca1e696b38868847d44&lat=14.75&lon=-17.30&aqi=yes&units=metric&lang=fr`)
            .then(res => res.json())
            .then(result => {
                setCurrentWeather(result);
                //   setQuery('');
                console.log(result);
            });
        //console.log(lat + " " + long)
        // 14.7161088,-17.4424064

        fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=a6e9e8c1daae5ca1e696b38868847d44&lat=14.75&lon=-17.30&aqi=yes&cnt=3&units=metric&lang=fr`)
            .then(res => res.json())
            .then(result => {
                setForecast(result)
                console.log(result);
            });
        getData();
    }, [lat, long]);

    const weatherForecast = typeof(forecat.list) !== "undefined"? forecat.list.map((data, index) => {
        return (
            <div key={index} className="city-widget fading">
                <div>
                    <p className="city-name">{data.dt_txt}</p>
                    <span> <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}></img> </span>
                    <span style={{ fontSize: "26px" }}>{data.main.temp} &deg;C, {data.weather[0].description}</span></div>
                <div style={{ display: 'flex', justifyContent: "space-around" }}>
                    <p>humidite: {data.main.humidity} %</p>
                    <p>vent: {data.wind.speed} Km/h</p>
                </div>
                {/* <div style={{ display: 'flex', justifyContent: "space-around" }}>
                    <p>lever soleil: {convDate(data.sys.sunrise)}</p>
                    <p>coucher soleil: {convDate(data.sys.sunset)}</p>
                </div> */}
            </div>
        )
    }):"";

    return (
        <div>
            <MyContext.Provider value={{query,updateQuery,handleSubmit}}>
                <WHeader></WHeader>
                <WSearch></WSearch>
                {typeof (currentWeather.main) != "undefined" ? <div className="current-weather">
                    <div className="city-widget fading">
                        <div>
                            <p className="city-name">{currentWeather.name}</p>
                            <span> <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}></img> </span>
                            <span style={{ fontSize: "26px" }}>{currentWeather.main.temp} &deg;C, {currentWeather.weather[0].description}</span></div>
                        <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <p>humidité: {currentWeather.main.humidity} %</p>
                            <p>vent: {currentWeather.wind.speed} Km/h</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <p>lever soleil: {convDate(currentWeather.sys.sunrise)}</p>
                            <p>coucher soleil: {convDate(currentWeather.sys.sunset)}</p>
                        </div>
                    </div>
                    <h5 className="jma-pdg-top ">Prévisions des prochains jours</h5>
                    <div className="widget-block">
                        {forecat.city != "undefined" && weatherForecast}
                    </div>
                </div> : (<div className="current-weather jma-pdg-top jma-pdg-bottom anime-opacity">Chargement...</div>)}
                
                {/* <Widget data={currentWeather}></Widget> */}
            <div style={{fontSize:"x-small",paddingLeft:"10px"}} className="foot-note">
                Made by/Conçu par <a href="http://doudou.ddns.net">Doudou</a>
            </div>    
            </MyContext.Provider>
        </div>
    )
}

export default WApp;