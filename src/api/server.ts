import fetch from 'node-fetch';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'ec47f10b6d0804fde032bbc8184e7a0e';  // Ensure your API key is stored in environment variables

export const serverDetails = {
    getWeatherDetails: async (city: string): Promise<any> => {
        const url = `${API_BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            console.log('Data from Weather API:', data);
            return data;
        } catch (err) {
            console.error('Error fetching data:', err);
            throw err; // Rethrow to handle the error in caller or to let the failure propagate
        }
    }
};
