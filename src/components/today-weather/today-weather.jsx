export default function ElementTodayWeather(props) {
  const { city, tempMax, tempMin, humidity, precipitation, onSearch } = props;

  return (
    <div className="elementTodayWeather">
      <h2>{city}</h2>
      <button onClick={() => { onSearch(); }}>Procurar</button>
      <p><strong>temperatura maxima: </strong>{tempMax}</p>
      <p><strong>temperatura minima: </strong>{tempMin}</p>
      <p><strong>humidade: </strong>{humidity}</p>
      <p><strong>precipitação: </strong>{precipitation}</p>
    </div>
  )
}