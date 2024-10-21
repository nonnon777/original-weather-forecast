const apiKey = "ef829a421215b5d087a462b49c03873b"; // ここにAPIキーを挿入
const lat = 34.7653;
const lon = 135.6267;
const weatherContainer = document.getElementById('weather');

async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("天気情報の取得に失敗しました:", error);
    }
}

function displayWeather(data) {
    console.log(data);  // APIからのデータを確認

    const hourlyForecasts = data.list.slice(0, 24); // 24時間分のデータを取得

    hourlyForecasts.forEach((forecast) => {
        const time = new Date(forecast.dt * 1000).toLocaleTimeString();
        const temperature = forecast.main.temp;  // 気温を取得
        const description = forecast.weather[0].description;

        const forecastElement = document.createElement('p');
        forecastElement.textContent = `${time}: 気温 ${temperature}℃, 天気: ${description}`;
        weatherContainer.appendChild(forecastElement);
    });
}

fetchWeather();
