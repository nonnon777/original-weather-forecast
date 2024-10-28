// 天気の画像ファイルを指定するオブジェクト
const weatherIcons = {
    sunny: "images/sunny.png",
    rainy: "images/rainy.png",
    cloudy: "images/cloudy.png",
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
  
  setInterval(updateTime, 1000);
  updateTime(); // ページ読み込み時に実行
  
  // 1時間ごとの予報データを生成する関数
  function generateHourlyForecast() {
    const forecastRow = document.getElementById('scrollable-row');
    const now = new Date();
  
    for (let i = 0; i < 48; i++) { // 48時間分の予報を表示
      const forecastTime = new Date(now.getTime() + i * 60 * 60 * 1000);
      const hour = String(forecastTime.getHours()).padStart(2, '0');
      const temp = Math.floor(Math.random() * 10) + 15; // 仮の気温
  
      // 天気をランダムに決定
      const weatherTypes = ["sunny", "rainy", "cloudy"];
      const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      const weatherIcon = weatherIcons[weather];
  
      // 予報のHTML要素を作成
      const hourBlock = document.createElement('div');
      hourBlock.className = 'hour';
      hourBlock.innerHTML = `
        <p>${hour}時</p>
        <p>${temp}°C</p>
        <img src="${weatherIcon}" alt="${weather}" class="weather-icon">
      `;
  
      forecastRow.appendChild(hourBlock);
    }
  }
  
  // ページ読み込み時に予報を生成
  generateHourlyForecast();
  