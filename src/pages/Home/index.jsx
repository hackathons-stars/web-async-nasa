import React from 'react';
import StructSlideBottom from '../../components/slide-bottom/slide-bottom';
import ElementMap from '../../components/map/map';
import ElementTodayWeather from '../../components/today-weather/today-weather';

export default function Home() {
  return (
    <>
      <ElementTodayWeather city="Campo Mourão" tempMax="28 °C" tempMin="20 °C" humidity="20%" precipitation="1mm" />
      <StructSlideBottom>
        <ElementMap />
      </StructSlideBottom>
    </>
  );
};