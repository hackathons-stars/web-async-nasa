import "./home.scss";
import { useState, useEffect, useRef } from 'react';
import StructSlideBottom from '../../components/slide-bottom/slide-bottom';
import ElementMap from '../../components/map/map';
import ElementTodayWeather from '../../components/today-weather/today-weather';
import ElementForecastWeather from '../../components/forecast-weather/forecast-weather';
import { getIcon, getWeather } from "../../service/open-weather-api/open-weather-api";
import dataOpen from "./data.json";

export default function Home() {
  const [todayWeather, setTodayWeather] = useState({
    city: "...",
    temp: "...",
    tempMax: "...",
    tempMin: "...",
    humidity: "...",
    precipitation: "...",
    icon: "",
    uiv: "..."
  })

  useEffect(() => {
    const data = dataOpen;
    const { current, daily } = data;
    todayWeather.city = "Campo Mourão";
    todayWeather.temp = current.temp
    todayWeather.tempMax = daily.at(0).temp.max;
    todayWeather.tempMin = daily.at(0).temp.max;
    todayWeather.humidity = current.humidity;
    todayWeather.uiv = current.uvi;
    todayWeather.icon = getIcon(current.weather.at(0).icon);
    todayWeather.precipitation = "";
    console.log({...todayWeather});

    /*
    console.log(data);



    /*
    getWeather(-52.319212, -24.051162)
      .then((data) => {
        console.log(data);
        const { current, daily } = data;

        todayWeather.city = "Campo Mourão";
        todayWeather.temp = current.temp
        todayWeather.tempMax = daily.at(0).temp.max;
        todayWeather.tempMin = daily.at(0).temp.max;
        todayWeather.humidity = current.humidity;
        todayWeather.uiv = current.uvi;
        todayWeather.icon = getIcon(current.weather.at(0).icon);
        todayWeather.precipitation = "";

        setTodayWeather(...todayWeather)

      })
      .catch((error) => { console.log(error) });
      */
  }, []);

  return (
    <div id="Home">
      <div className='containerHome'>
        <ElementTodayWeather
          city={todayWeather.city}
          tempMax={todayWeather.tempMax}
          tempMin={todayWeather.tempMin}
          humidity={todayWeather.humidity}
          icon={todayWeather.icon}
          uiv={todayWeather.uiv}
          onSearch={() => { console.log("Pesquisar") }}
        />
        <ElementForecastWeather
          title="Previsão do tempo 8 dias"
          date="05/10/2024"
          data={[
            { temp: 10, humidity: 10, precipitation: 10 },
            { temp: 10, humidity: 10, precipitation: 10 },
            { temp: 10, humidity: 10, precipitation: 10 },
            { temp: 10, humidity: 10, precipitation: 10 }]}
        />
        <StructSlideBottom>
          <ElementMap />
        </StructSlideBottom>
      </div>
    </div>
  );
};
