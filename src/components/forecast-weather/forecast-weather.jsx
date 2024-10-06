import "./forecast-weather.scss";

export default function ElementForecastWeather(props) {
  const { title, date, data } = props;

  return (
    <div>
      <h2>{title} {date}</h2>
      <hr />
      {data?.map(({ temp, humidity, precipitation }, index) => {
        return (
          <p key={index}>{temp} {humidity} {precipitation}</p>
        )
      })}
    </div>
  )
}