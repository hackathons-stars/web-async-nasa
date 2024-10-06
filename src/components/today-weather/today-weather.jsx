import "./today-weather.scss";
import { WiHumidity } from "react-icons/wi";
import { FaSun } from "react-icons/fa";

export default function ElementTodayWeather(props) {
  const { title, tempMax, tempMin, humidity, precipitation, onSearch, icon, uiv, description } = props;

  return (
    <div className="elementTodayWeather">
      <h2 className="title">{title}</h2>
      <p>{description}</p>
      <p><strong>temperatura maxima: </strong>{tempMax}</p>
      <p><strong>temperatura minima: </strong>{tempMin}</p>
      <WiHumidity /><p><strong>humidade: </strong>{humidity}</p>
      <FaSun /><p><strong>iuv: </strong>{uiv}</p>
      <img className="icon" src={icon} alt="" />
      {/* <p><strong>precipitação: </strong>{precipitation}</p> */}
    </div>
  )
}