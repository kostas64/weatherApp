export const getForecast = async () => {
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,weathercode&hourly=weathercode,precipitation_probability,temperature_2m,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=auto';

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data;
};
