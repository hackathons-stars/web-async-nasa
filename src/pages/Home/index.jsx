import React from 'react';
import StructSlideBottom from '../../components/slide-bottom/slide-bottom';
import ElementMap from '../../components/map/map';
import ElementTodayWeather from '../../components/today-weather/today-weather';
import ElementForecastWeather from '../../components/forecast-weather/forecast-weather';

export default function Home() {
  return (
    <>
      <ElementTodayWeather
        city="Campo Mourão"
        tempMax="28 °C"
        tempMin="20 °C"
        humidity="20%"
        precipitation="1mm"
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
    </>
  );
};