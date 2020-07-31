import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'ba7e374e475b2b4cca37b271ca7fda60';

// const URL = 'https://api.openweathermap.org/data/2.5/weather';
// const API_KEY = 'f33a484cf794d08d0148764789aaba32';

// our query is the name of the town that we want to search for
// we will get the response from api with the help of the URL 
// units - type of measurement
export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}