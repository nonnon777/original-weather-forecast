const apiKey = "ef829a421215b5d087a462b49c03873b"; // ここにAPIキーを挿入
const lat = 34.7653;
const lon = 135.6267;

// 天気の画像ファイルを指定するオブジェクト
const weatherIcons = {
  sunny: "images/sunny.png",
  rainy: "images/rain.png",
  cloudy: "images/clouds.png",
};

// 現在時刻を更新する関数
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById('current-time').textContent = `現在時刻: ${formattedTime}`;
}

// 日付と曜日を更新する関数
function updateDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  const formattedDate = now.toLocaleDateString('ja-JP', options);
  document.getElementById('current-date').textContent = formattedDate; // 日付と曜日を表示
}

setInterval(updateTime, 1000);
updateTime(); // ページ読み込み時に時刻を更新
updateDate(); // ページ読み込み時に日付を更新

// 天気データを取得して表示する関数
async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    const data = await response.json();
    displayWeather(data); // 現在の天気情報を表示
    displayHourlyForecast(data); // 1時間ごとの予報を表示
  } catch (error) {
    console.error("天気情報の取得に失敗しました:", error);
  }
}

// 天気データをもとに予報を表示する関数
function displayWeather(data) {
  const temp = Math.round(data.list[0].main.temp); // 現在の温度
  const tempMax = Math.round(data.list[0].main.temp_max); // 最高温度
  const tempMin = Math.round(data.list[0].main.temp_min); // 最低温度
  const description = data.list[0].weather[0].description;

  document.getElementById('current-temp').textContent = `${temp}°C`;
  document.getElementById('max-temp').textContent = `${tempMax}°C`; // 最高温度を表示
  document.getElementById('min-temp').textContent = `${tempMin}°C`; // 最低温度を表示
  document.getElementById('weather-desc').textContent = description; // 天気の説明を表示
}

// 1時間ごとの予報を表示する関数
function displayHourlyForecast(data) {
  const hourlyForecasts = data.list.slice(0, 8); // 次の8時間のデータを取得
  const forecastRow = document.getElementById('scrollable-row');
  forecastRow.innerHTML = ''; // 既存のデータをクリア

  hourlyForecasts.forEach((forecast) => {
    const forecastTime = new Date(forecast.dt * 1000);
    const hour = String(forecastTime.getHours()).padStart(2, '0');
    const temp = Math.round(forecast.main.temp);
    const icon = `images/${forecast.weather[0].main.toLowerCase()}.png`; // アイコンのパス

    // 予報のHTML要素を作成
    const hourBlock = document.createElement('div');
    hourBlock.className = 'hour';
    hourBlock.innerHTML = `
      <p>${hour}時</p>
      <p>${temp}°C</p>
      <img src="${icon}" alt="${forecast.weather[0].description}" class="weather-icon">
    `;

    forecastRow.appendChild(hourBlock);
  });
}

fetchWeather(); // ページ読み込み時に天気を取得
