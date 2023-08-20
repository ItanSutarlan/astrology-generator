const predictionResult = document.getElementById("predictionResult");

const jsonFileUrl = './data/horoscope.json';

try {
  if (window.location.search.length) {
    const searchParams = new URLSearchParams(window.location.search);
    const month = searchParams.get('month')
    const zodiac = searchParams.get('zodiac')
    const result = await generateRandomHoroscope(month, zodiac);
  
    formatResult(result);

    predictionResult.style.display = 'block'

  }

} catch (error) {
  console.error('Error fetching or parsing JSON:', error);
}

function generateRandomNumber(num) {
  // Gets # from 0 -> num - 1
  return Math.floor(Math.random() * num)
}

async function generateRandomHoroscope (month, zodiac) {
  const response = await fetch(jsonFileUrl);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  const horoscope = await response.json(); // Parse the response as JSON

  const currentZodiac = horoscope[zodiac][month]
  const result = {
    month,
    zodiac
  };
  for(const prop in currentZodiac) {
    result[prop.slice(0, -1)] = currentZodiac[prop][generateRandomNumber(currentZodiac[prop].length)]

  }
  return result;
}

function formatResult(obj) {
  for(const prop in obj) {
    if(prop !== 'month' && prop !== 'zodiac') {
      document.getElementById(prop).innerText = obj[prop]
      continue
    }
    document.getElementById(`selected-${prop}`).innerText = obj[prop]
  }
}