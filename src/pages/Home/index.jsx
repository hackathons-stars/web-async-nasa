import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ensolarado from '../../icons/sol.png';
import nublado from '../../icons/nuvem.png';
import chuvoso from '../../icons/chuva.png';
import umidade from '../../icons/umidade.png';
import temperatura from '../../icons/temperatura.png';

const Home = () => {
  return (
    <div className="container" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Header />

      {/* Seção 1: Umidade e Temperatura */}
      <section className="text-center my-4">
        <h2>Umidade</h2>
        <div className="d-flex justify-content-center align-items-center">
          <img src={umidade} alt="Umidade" className="img-fluid" style={{ maxWidth: '50px' }} />
          <span className="mx-2">65%</span>
        </div>
        <h2>Temperatura</h2>
        <div className="d-flex justify-content-center align-items-center">
          <img src={temperatura} alt="Temperatura" className="img-fluid" style={{ maxWidth: '50px' }} />
          <span className="mx-2">25°C</span>
        </div>
      </section>

      <hr />

      {/* Seção 2: Previsão do Tempo para os Próximos 5 Dias */}
      <section className="text-center my-4">
        <h2>Previsão do Tempo para os Próximos 5 Dias</h2>
        <div className="d-flex justify-content-around">
          <div>
            <h3>Segunda</h3>
            <img src={ensolarado} alt="Sol" className="img-fluid" style={{ maxWidth: '50px' }} />
          </div>
          <div>
            <h3>Terça</h3>
            <img src={chuvoso} alt="Chuva" className="img-fluid" style={{ maxWidth: '50px' }} />
          </div>
          <div>
            <h3>Quarta</h3>
            <img src={nublado} alt="Nublado" className="img-fluid" style={{ maxWidth: '50px' }} />
          </div>
          <div>
            <h3>Quinta</h3>
            <img src={ensolarado} alt="Sol" className="img-fluid" style={{ maxWidth: '50px' }} />
          </div>
          <div>
            <h3>Sexta</h3>
            <img src={chuvoso} alt="Chuva" className="img-fluid" style={{ maxWidth: '50px' }} />
          </div>
        </div>
      </section>

      <hr />

      {/* Seção 3: Imagens */}
      <section className="text-center my-4">
        <h2>Imagens do Clima</h2>
        <div className="d-flex justify-content-center">
          <img src={ensolarado} alt="Dia ensolarado" className="img-fluid" style={{ maxWidth: '150px' }} />
          <img src={chuvoso} alt="Dia chuvoso" className="img-fluid mx-2" style={{ maxWidth: '150px' }} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
