import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const Plantar = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Newsletter de Plantio</h2>
        <p className="text-center">
          Receba informações sobre o melhor período para plantio na sua região. Baseado em condições meteorológicas e
          dados de solo, aqui estão as informações de plantio para <strong>Campo Mourão</strong>.
        </p>

        <Table striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>Meteorológicos</th>
              <th>Temperatura</th>
              <th>Umidade</th>
              <th>Vento</th>
              <th>Chance de Precipitação</th>
              <th>Visibilidade</th>
              <th>Incidência UV</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dados Meteorológicos</td>
              <td>21°C</td>
              <td>65%</td>
              <td>15 km/h</td>
              <td>10%</td>
              <td>10 km</td>
              <td>Moderada</td>
            </tr>
          </tbody>
        </Table>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dados do Solo</th>
              <th>PH</th>
              <th>Umidade</th>
              <th>Pressão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dados do Solo</td>
              <td>6.8</td>
              <td>20%</td>
              <td>1015 hPa</td>
            </tr>
          </tbody>
        </Table>

        <div className="text-center my-4">
          <Button variant="primary">Assine a Newsletter</Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Plantar;
