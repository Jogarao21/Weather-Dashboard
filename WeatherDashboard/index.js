const API_KEY = '7f5e4e8c9d3b2a1f6e8d9c2b3a4f5e6d'; // Demo key - replace with your OpenWeatherMap API key
        const searchBtn = document.getElementById('searchBtn');
        const cityInput = document.getElementById('cityInput');
        const weatherContent = document.getElementById('weatherContent');

        // Weather icon mapping
        const weatherIcons = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };

        async function fetchWeatherData(city) {
            try {
                showLoading();
                
                // Using a free weather API service (OpenWeather-like format)
                // For demo purposes, we'll simulate the API response
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
                
                // Simulated weather data for Bangalore
                const weatherData = {
                    name: city,
                    main: {
                        temp: Math.round(25 + Math.random() * 10),
                        feels_like: Math.round(27 + Math.random() * 8),
                        humidity: Math.round(60 + Math.random() * 30),
                        pressure: Math.round(1010 + Math.random() * 20)
                    },
                    weather: [
                        {
                            main: 'Clear',
                            description: 'clear sky',
                            icon: '01d'
                        }
                    ],
                    wind: {
                        speed: Math.round(3 + Math.random() * 7),
                        deg: Math.round(Math.random() * 360)
                    },
                    visibility: Math.round(8000 + Math.random() * 2000),
                    sys: {
                        sunrise: new Date().setHours(6, 30),
                        sunset: new Date().setHours(18, 45)
                    }
                };

                displayWeatherData(weatherData);
            } catch (error) {
                showError('Failed to fetch weather data. Please try again.');
            }
        }

        function showLoading() {
            weatherContent.innerHTML = '<div class="loading">Loading weather data...</div>';
        }

        function showError(message) {
            weatherContent.innerHTML = `<div class="error">${message}</div>`;
        }

        function displayWeatherData(data) {
            const now = new Date();
            const sunriseTime = new Date(data.sys.sunrise).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const sunsetTime = new Date(data.sys.sunset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            weatherContent.innerHTML = `
                <div class="weather-grid">
                    <div class="main-weather">
                        <div class="weather-icon">${weatherIcons[data.weather[0].icon] || '🌤️'}</div>
                        <div class="temperature">${data.main.temp}°C</div>
                        <div class="description">${data.weather[0].description}</div>
                        <div class="location">📍 ${data.name}</div>
                        <div class="datetime">${now.toLocaleDateString()} • ${now.toLocaleTimeString()}</div>
                    </div>

                    <div class="weather-details">
                        <div class="detail-item">
                            <span class="detail-label">Feels like</span>
                            <span class="detail-value">${data.main.feels_like}°C</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Humidity</span>
                            <span class="detail-value">${data.main.humidity}%</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Pressure</span>
                            <span class="detail-value">${data.main.pressure} hPa</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Wind Speed</span>
                            <span class="detail-value">${data.wind.speed} m/s</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Visibility</span>
                            <span class="detail-value">${(data.visibility / 1000).toFixed(1)} km</span>
                        </div>
                    </div>
                </div>

                <div class="additional-info">
                    <div class="info-card">
                        <div class="info-icon">🌅</div>
                        <div class="info-title">Sunrise</div>
                        <div class="info-value">${sunriseTime}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-icon">🌇</div>
                        <div class="info-title">Sunset</div>
                        <div class="info-value">${sunsetTime}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-icon">🧭</div>
                        <div class="info-title">Wind Direction</div>
                        <div class="info-value">${data.wind.deg}°</div>
                    </div>
                    <div class="info-card">
                        <div class="info-icon">🌡️</div>
                        <div class="info-title">Temperature</div>
                        <div class="info-value">${data.main.temp}°C</div>
                    </div>
                </div>
            `;
        }

        function handleSearch() {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeatherData(city);
            }
        }

        // Event listeners
        searchBtn.addEventListener('click', handleSearch);
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // Auto-refresh every 5 minutes
        setInterval(() => {
            const city = cityInput.value.trim() || 'Bangalore';
            fetchWeatherData(city);
        }, 300000);

        // Load Bangalore weather on page load
        fetchWeatherData('Bangalore');

        // Update time every second
        setInterval(() => {
            const datetimeElements = document.querySelectorAll('.datetime');
            const now = new Date();
            datetimeElements.forEach(el => {
                if (el.textContent.includes('•')) {
                    el.textContent = `${now.toLocaleDateString()} • ${now.toLocaleTimeString()}`;
                }
            });
        }, 1000);