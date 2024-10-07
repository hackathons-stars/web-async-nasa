import { FaSun, FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import "./forecast-weather.scss";
import { MdWaterDrop } from "react-icons/md";

export default function ElementForecastWeather(props) {
  const { title, date, data } = props;
  return (
    <div className="elementForecastWeather">
      <h2>{title} </h2>
      {data?.map(({
        date,
        icon,
        description,
        humidity,
        uiv,
        tempMax,
        tempMin,
      }, index) => {
        return (
          <div key={index}>
            <div className="linha">
              <div className="containerIcon">
                <img className="icon" src={icon} alt="" />
                <div>
                  <span className="text">
                    {date}
                  </span>
                  <br />
                  <span className="text">
                    {description}
                  </span>
                </div>
              </div>
              <div className="containerTemp">
                <FaTemperatureArrowUp size={30} />
                <span className="textTemp">
                  {Number(tempMax).toFixed(0)} °C
                </span>
                <FaTemperatureArrowDown size={30} />
                <span className="textTemp">
                  {Number(tempMin).toFixed(0)} °C
                </span>
              </div>
            </div>
            <div className="linha">
              <div>
              </div>
              <div className="containerTemp">
                <MdWaterDrop size={30} />
                <span className="textTemp">
                  {Number(humidity).toFixed(0)} %
                </span>
                <FaSun size={30} />
                <span className="textTemp">
                  {Number(uiv).toFixed(2)}
                </span>
              </div>
            </div>
            {index < data.length - 1 ? <hr className="divisor" /> : null}
          </div>
        )
      })}
    </div>
  )
}