import axios from "axios";

export async function getWeather(lon, lat){
  const url = "http://localhost:5000/today";
  const params = {
    lon,lat
  }

  const response = await axios.get(url, {params});

  return response.data; 
}

export function getIcon(id){
  return `http://openweathermap.org/img/wn/${id}@2x.png`
}

export async function getIA(lon, lat, culture){
  const url = "http://localhost:5000/chat";
  const params = {
    lon, lat, culture
  }

  const response = await axios.get(url, {params});

  return response.data; 
}