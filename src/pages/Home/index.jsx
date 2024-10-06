import "./home.scss";
import StructSlideBottom from "../../components/slide-bottom/slide-bottom";
import ElementMap from "../../components/map/map";
import ElementTodayWeather from "../../components/today-weather/today-weather";
import ElementForecastWeather from "../../components/forecast-weather/forecast-weather";
import { useState, useEffect } from "react";
import {
  getIcon,
  getWeather,
} from "../../service/open-weather-api/open-weather-api";
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
    uiv: "...",
    description: ""
  })

  const [weatherForecast, setWeatherForecast] = useState([]);

  const [markers, setMarkers] = useState([]);

  const updateMarkers = async () => {
    const data = dataOpen;

    const savedMarkes = JSON.parse(localStorage.getItem("markers")) ?? [];

    const markersWithData = [];

    for (let i = 0; i < savedMarkes.length; i++) {
      const { name, lat, lng } = savedMarkes.at(i);

      //const { current } = await getWeather(lng, lat);
      const { current } = await (async () => { return data })();
      const { temp, uvi, humidity } = current;

      markersWithData.push({
        name, lat, lng, temp, uvi, humidity
      })
    }

    console.log(markersWithData);

    setMarkers(markersWithData);
  }

  useEffect(() => {
    const data = dataOpen;
    const { current, daily } = data;
    todayWeather.city = "Campo Mourão";
    todayWeather.temp = current.temp;
    todayWeather.tempMax = daily.at(0).temp.max;
    todayWeather.tempMin = daily.at(0).temp.max;
    todayWeather.humidity = current.humidity;
    todayWeather.uiv = current.uvi;
    todayWeather.icon = getIcon(current.weather.at(0).icon);
    todayWeather.precipitation = "";
    todayWeather.description = current.weather.at(0).description;
    console.log({ ...todayWeather });

    setWeatherForecast(daily.map(({ weather, temp, uvi, humidity, dt }) => {
      const date = new Date(dt * 1000);

      return {
        date: date.toLocaleDateString('pt-BR'),
        humidity: humidity,
        uiv: uvi,
        icon: getIcon(weather.at(0)?.icon),
        description: weather.at(0).description,
        tempMax: temp.max,
        tempMin: temp.min,
      }
    }));

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

  useEffect(() => {
    updateMarkers();
  }, []);

  return (
    <div id="Home">
      <div className='containerHome'>
        <div className="contentHome">
          <ElementTodayWeather
            temp={todayWeather.temp}
            title={todayWeather.city}
            tempMax={todayWeather.tempMax}
            tempMin={todayWeather.tempMin}
            humidity={todayWeather.humidity}
            icon={todayWeather.icon}
            uiv={todayWeather.uiv}
            description={todayWeather.description}
            onSearch={() => { console.log("Pesquisar") }}
          />
          <ElementForecastWeather
            title="Previsão do tempo"
            data={weatherForecast}
          />
        </div>
        <StructSlideBottom>
          <ElementMap onSaveDefaultLoc={() => {
            console.log("Salvo como favorito !");
          }}
            updateMarkers={updateMarkers}
          />
        </StructSlideBottom>
      </div>
    </div>
  );
}
