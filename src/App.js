import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';


const App = () => {
    const [query, setQuery] = useState('');
    //set weather used for the data that we receive
    const [weather, setWeather] = useState({});


    const search = async(e) =>{
        //Checking if the press key is Enter
        //On clicking enter we perform a search
        if(e.key === 'Enter'){
            const data = await fetchWeather(query);

            setWeather(data);
            //we need to reset it after click
            setQuery(' ');
        }

    }

    return (
        <div className= "main-container">
            {/* every input needs to be of type text 
                */}
            <input 
                type = "text"
                className = "search"
                placeholder = "Search ..."
                value = {query}
                onChange = {(e) => setQuery(e.target.value)}
                // if key pressed is enter then we need to perform search
                onKeyPress = {search}
            />
            {weather.main && (
                <div className = "city">
                    <h2 className = "city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>

                    </h2>
                <div className="city-temp">
                    {Math.round(weather.main.temp)}
                    <sup>&deg;C</sup>
                </div>
                {/* getting image from the open weather api */}
                {/* alt tag provides more images to the reader */}
                <div className="info">
                    <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                    <p>{weather.weather[0].description}</p>
                </div>
                {/* <div className='visibility'>
                {Math.round(weather.main.pressure)}
                <sup>ps</sup>
                </div> */}

                </div>

            )}
        </div>
    );
}

export default App;
