import "./home.scss";
import { useState, useEffect, useRef } from 'react';
import StructSlideBottom from '../../components/slide-bottom/slide-bottom';
import ElementMap from '../../components/map/map';
import ElementTodayWeather from '../../components/today-weather/today-weather';
import ElementForecastWeather from '../../components/forecast-weather/forecast-weather';

export default function Home() {

  const handlePlaceSelect = (place) => {
    geocodeByAddress(place.label)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setMarker({
          lat,
          lng,
        });
      })
      .catch(error => console.error("Error fetching location: ", error));
  };

  return (
    <div id="Home">
      <div className='containerHome'>
        <ElementTodayWeather
          city="Campo Mourão"
          tempMax="28 °C"
          tempMin="20 °C"
          humidity="20%"
          precipitation="1mm"
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
