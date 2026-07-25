import React, { useState } from 'react'
import { Search } from 'lucide-react';
const WeatherCard = () => {
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState(null)

    const API_KEY = "2c00cb7d9a92e3d8d9c2ce10525cb06e"

    const getWeather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await response.json();
        console.log(data);
        setWeather(data);
        setCity("");

    }

    return (
        <div className='flex items-center justify-center h-screen 
                            bg-linear-to-br from-[#4facfe] to-[#00f2fe]'>
            <div className='min-h-50 w-120 border-0 rounded-4xl text-center bg-white transition-all duration-300'>
                <h1 className='text-4xl font-bold mt-10'>🌤 Weather App</h1>

                <div className='flex gap-2 justify-center mt-10'>
                    <input className='w-[300px] px-5 py-2  bg-gray-200 rounded-xl outline-0 border-0 text-xl' value={city} onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                getWeather();
                            }
                        }}
                         type="text" placeholder='Enter City' />
                    <button className='p-3 w-[50px] rounded-xl items-center  border-0 bg-[#2196f3] hover:bg-[#0d8bf2] cursor-pointer text-white' onClick={getWeather}>
                        <Search />
                    </button>


                </div>
                {
                    weather && weather.cod === 200 && (
                        <div className="mt-8 text-center">
                            <h2 className="text-3xl font-bold">{weather.name}</h2>

                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt="weather icon"
                                className="mx-auto"
                            />

                            <h1 className="text-5xl font-bold">
                                {weather.main.temp}°C
                            </h1>

                            <p className="text-xl mt-2">
                                {weather.weather[0].main}
                            </p>

                            <p>Humidity : {weather.main.humidity}%</p>

                            <p>Wind : {weather.wind.speed} km/h</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default WeatherCard