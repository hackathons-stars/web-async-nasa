import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Header from './Header';
import Footer from './Footer';
import ensolarado from '../icons/sol.png';
import nublado from '../icons/nuvem.png';
import chuvoso from '../icons/chuva.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faWind, faTriangleExclamation, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState('Campo Mourão');
  const navigate = useNavigate();

  const handleSelect = (location) => {
    setSelectedLocation(location);
  };

  const handlePlanting = () => {
    navigate('/plantar');
  };

  return (
    <>
      <Header />
      <div className="container">
      <section className="Location mb-4">
          <h2 className="text-muted">Propriedade em</h2>
          <DropdownButton id="dropdown-basic-button" title={selectedLocation} onSelect={handleSelect}>
            <Dropdown.Item eventKey="Campo Mourão">Campo Mourão</Dropdown.Item>
            <Dropdown.Item eventKey="Sertãozinho">Sertãozinho</Dropdown.Item>
            <Dropdown.Item eventKey="Prudentópolis">Prudentópolis</Dropdown.Item>
            <Dropdown.Item eventKey="Adicionar nova propriedade"><button className='btn btn-outline-dark'>Adicionar</button></Dropdown.Item>
          </DropdownButton>
          <Button variant="outline-success" className="ms-3" onClick={handlePlanting}><FontAwesomeIcon icon={faSeedling} />Plantar</Button>
        </section>
        <hr />
        {/* Tabela de horário, temperatura e umidade */}
        <section className="divBox mb-5 text-center">
          <h4>Condições de temperatura e umidade previstas para as próximas 24 horas</h4>
          <div className="table-responsive overflow-auto" style={{ whiteSpace: 'nowrap' }}>
            <table className="table table-sm table-borderless text-center">
              <thead>
                <tr>
                  <th>Agora</th>
                  <th>07</th>
                  <th>08</th>
                  <th>09</th>
                  <th>10</th>
                  <th>11</th>
                  <th>12</th>
                  <th>13</th>
                  <th>14</th>
                  <th>15</th>
                  <th>16</th>
                  <th>17</th>
                  <th>18</th>
                  <th>19</th>
                  <th>20</th>
                  <th>21</th>
                  <th>22</th>
                  <th>23</th>
                  <th>00</th>
                  <th>01</th>
                  <th>02</th>
                  <th>03</th>
                  <th>04</th>
                  <th>05</th>
                  <th>06</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>25°</td>
                  <td>26°</td>
                  <td>26°</td>
                  <td>26°</td>
                  <td>26°</td>
                  <td>25°</td>
                  <td>24°</td>
                  <td>23°</td>
                  <td>23°</td>
                  <td>22°</td>
                  <td>22°</td>
                  <td>22°</td>
                  <td>21°</td>
                  <td>21°</td>
                  <td>21°</td>
                  <td>20°</td>
                  <td>19°</td>
                  <td>19°</td>
                  <td>18°</td>
                  <td>18°</td>
                  <td>18°</td>
                  <td>17°</td>
                  <td>16°</td>
                  <td>16°</td>
                  <td>16°</td>
                </tr>
                <tr>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <hr />
        {/* Mapas meteorológicos */}
        <section className="divBox mb-5">
          <div className="mapa mb-4">
            <div className="tituloBox">
              <FontAwesomeIcon icon={faDroplet} className="me-2" /> Precipitação
            </div>
            <h1 className="text-center text-muted bg-light border rounded">INSERIR MAPA</h1>
          </div>
          <div className="mapa">
            <div className="tituloBox">
              <FontAwesomeIcon icon={faWind} className="me-2" /> Vento
            </div>
            <h1 className="text-center text-muted bg-light border rounded">INSERIR MAPA</h1>
          </div>
        </section>
        {/* Ativar notificações */}
        <section className="divBox mb-5 p-4 bg-light border rounded">
          <div className="tituloBox d-flex align-items-center mb-3">
            <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" /> 
            <h5 className="mb-0">Alerta de tempo</h5>
          </div>
          <h2 className="text-danger">Clima seco.</h2>
          <p>Previsão de seca para os próximos 15 dias. Condições de tempo limpas pela manhã, alta incidência de raios UV.</p>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;