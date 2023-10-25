import React, { useState } from "react";
import "./Weather.css";
import location from "./img/location.png";
import humid from "./img/humid.png";
import wind from "./img/wind.png";
import cloud from "./img/cloud.png";
import sunrise from "./img/sunrise.png";
import sunset from "./img/sunset.png";
import mascot from "./img/mascot.png";
import clear_day from "./img/clear.png";
import clear_night from "./img/clear_night.png";
import all_cloud from "./img/cloud.png";
import heavy_rain from "./img/heavy_rain.png";
import thunder_storm from "./img/thunder_storm.png";
import mist from "./img/mist.png";
import snow from "./img/snow.png";




const Weather=()=>{
    const api_key="7215ede2b15f57ba408ac7e0eb31cae6";
    const [wicon,seticon] = useState(mascot);

    const search=async ()=>{
        const location=document.getElementById("search");
        try{
            if(location.value===""){
                return 0;
            }
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${location.value}&units=Metric&appid=${api_key}`;

            const response=await fetch(url);
            const data=await response.json();
            // console.log(data);

            let sun=`https://api.sunrise-sunset.org/json?lat=${data.coord.lat}&lng=${data.coord.lat}`;

            const res = await fetch(sun);
            const result = await res.json();
            
            const body = document.getElementById("body");
            const contain = document.getElementById("contain");

            const humid = document.getElementById("humid");
            const wind = document.getElementById("wind");
            const cloud = document.getElementById("cloud");
            const sunrise = document.getElementById("sunrise");
            const sunset = document.getElementById("sunset");
            const city = document.getElementById("city");
            const haze = document.getElementById("haze");
            const temp = document.getElementById("temp");
            const feel = document.getElementById("feel");
            

            humid.innerHTML = data.main.humidity;
            wind.innerHTML = Math.floor(data.wind.speed);
            cloud.innerHTML = data.clouds.all;
            sunrise.innerHTML = result.results.sunrise;
            sunset.innerHTML = result.results.sunset;
            haze.innerHTML = data.weather[0].main;
            city.innerHTML = data.name;
            temp.innerHTML = Math.floor(data.main.temp);
            feel.innerHTML = Math.floor(data.main.feels_like);

            if(data.weather[0].icon === "01n" || data.weather[0].icon === "02n" || data.weather[0].icon === "03n" || data.weather[0].icon === "04n" || data.weather[0].icon === "09n" || data.weather[0].icon === "10n" || data.weather[0].icon === "11n" || data.weather[0].icon === "13n" || data.weather[0].icon === "50n"){
                body.style.backgroundColor = "rgba(224, 158, 255, 0.644)";
                contain.style.backgroundImage = "linear-gradient(to left bottom,rgb(17, 7, 73),rgb(70, 30, 165),rgb(202, 111, 255))";
            }
            else{
                body.style.backgroundColor = "rgba(158, 200, 255, 0.644)";
                contain.style.backgroundImage = "linear-gradient(to left bottom,rgb(10, 39, 94),rgb(39, 88, 179),rgb(88, 187, 253))";
            }
            
            if(data.weather[0].icon === "01n"){
                seticon(clear_night);
            }
            else if(data.weather[0].icon === "01d"){
                seticon(clear_day);
            }
            else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n" || data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
                seticon(all_cloud);
            }
            else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n" ||data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
                seticon(heavy_rain);
            }
            else if(data.weather[0].icon === "11d" || data.weather[0].icon === "11n"){
                seticon(thunder_storm);
            }
            else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
                seticon(snow);
            }
            else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n"){
                seticon(mist);
            }            
        }
        catch(e){
            alert("Sorry!! we don't have information");
            // alert(e);
        }
    }
    
    return(
        <div id="body" class="body">
            <div id="contain" class="contain">
                <p class="heading">Weather</p>
                {/* search div */}
                <div class="search-box">   
                    <input class="search" id="search" placeholder="Enter Location"></input>
                    <button class="button" onClick={()=>{search()}}>Search</button>
                    {/* <img class="search-button" src={search}></img> */}
                </div>

                {/* location */}
                <div class="location_box">
                    <img class="location" src={location} alt="img"></img>
                    <p id="city" class="city">Location</p>
                    <p id="haze" class="haze">Weather</p>
                </div>
                <img class="temp-pic" src={wicon} alt="pic"></img>
                {/* temperature div */}
                <div class="temp-box">
                    {/* <img class="temp-pic" src={temp}></img> */}
                    <p class="temp"><span id="temp">--</span>°c</p>
                    <p class="feel">Feels Like <span id="feel">--</span>°c</p>
                </div>

                {/* List */}
                <ul class="list-box">
                    <li><h4><img class="list_image" src={humid} alt="pic"></img>Humdity:</h4> <h4><span id="humid">--</span>%</h4> </li><hr></hr>
                    <li><h4><img class="list_image" src={wind} alt="pic"></img> Wind:</h4><h4><span id="wind">--</span> km/h</h4> </li><hr></hr>
                    <li><h4><img class="list_image" src={cloud} alt="pic"></img> Cloud:</h4><h4 id="cloud">--</h4> </li><hr></hr>
                    <li><h4><img class="list_image" src={sunrise} alt="pic"></img> Sunrise:</h4><h4 id="sunrise">--:--:-- AM</h4> </li><hr></hr>
                    <li><h4><img class="list_image" src={sunset} alt="pic"></img> Sunset:</h4><h4 id="sunset">--:--:-- PM</h4> </li><hr></hr>
                </ul>


            </div>
        </div>
    );
}
export default Weather;