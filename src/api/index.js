export const getForecast = async (selectedPlace, tempUnit) => {
  const lat = selectedPlace?.latitude;
  const lon = selectedPlace?.longitude;

  let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,weathercode&hourly=weathercode,precipitation_probability,temperature_2m,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=auto`;

  if (tempUnit === 'fahrenheit') {
    url = `${url}&temperature_unit=${tempUnit}`;
  }

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

export const getYourPlacesTemp = async (place, tempUnit) => {
  const lat = place?.latitude;
  const lon = place?.longitude;

  let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`;

  if (tempUnit === 'fahrenheit') {
    url = `${url}&temperature_unit=${tempUnit}`;
  }

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
