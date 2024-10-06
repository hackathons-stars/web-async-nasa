import "./today-weather.scss";
import { WiHumidity } from "react-icons/wi";
import { FaSun } from "react-icons/fa";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";

export default function ElementTodayWeather(props) {
  const { temp, title, tempMax, tempMin, humidity, precipitation, onSearch, icon, uiv, description } = props;

  return (
    <div className="elementTodayWeather">
      <h2 className="title">{temp} °C <br />{title}</h2>
      <p className="description">{description}</p>
      <hr />
      <div className="containerTemp">
        <div>
          <h3>Máxima</h3>
          <div className="containerTempIcon">
            <FaTemperatureArrowUp size={20} />
            <span className="textTemp">
              {tempMax} °C
            </span>
          </div>
        </div>
        <div>
          <h3>Mínima</h3>
          <div className="containerTempIcon">
            <FaTemperatureArrowDown size={20} />
            <span className="textTemp">
              {tempMin} °C
            </span>
          </div>
        </div>
      </div>
      <div className="containerTemp">
        <div>
          <h3>Umidade</h3>
          <div className="containerTempIcon">
            <MdWaterDrop size={30} />
            <span className="textTemp">
              {humidity} %
            </span>
          </div>
        </div>
        <div>
          <h3>Indice UV</h3>
          <div className="containerTempIcon">
            <FaSun size={30} />
            <span className="textTemp">
              {uiv}
            </span>
          </div>
        </div>
      </div>
      <img className="icon" src={icon} alt="" />
      {/* <p><strong>precipitação: </strong>{precipitation}</p> */}
    </div>
  )
}