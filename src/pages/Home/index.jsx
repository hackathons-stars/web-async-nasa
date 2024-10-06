import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import StructSlideBottom from '../../components/slide-bottom/slide-bottom';
import ElementMap from '../../components/map/map';
import Header from '../Header';

export default function Home() {
  return (
    <>
      <StructSlideBottom>
        <ElementMap />
      </StructSlideBottom>
    </>
  );
};