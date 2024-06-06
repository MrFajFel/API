const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&lang=pl&appid=51caba152ec46219acd1140abe231ae5";
const API_UNITS = "&units=metric";

const getWeather = () => {
    
	const city = input.value || 'london'
	const URL = API_LINK + city + API_KEY + API_UNITS;
	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
            console.log(res.data);
			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + "°C";
			humidity.textContent = hum + "%";
			weather.textContent = status.description;

			warning.textContent = "";
			input.value = "";

			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute("src", "./img/thunderstorm.jpg");
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute("src", "./img/drizzle.jpg");
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute("src", "./img/rain.jpg");
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute("src", "./img/ice.jpg");
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute("src", "./img/fog.jpg");
			} else if (status.id === 800) {
				photo.setAttribute("src", "./img/sun.jpg");
			} else if (status.id >= 800 && status.id < 900) {
				photo.setAttribute("src", "./img/cloud.jpg");
			} else {
				photo.setAttribute("src", "./img/unknown.jpg");
			}
		})
		.catch(
			() => (warning.textContent = "wpisz poprawną nazwę miasta".toUpperCase())
		);
        
};

const enter = e => {
	if (e.key === "Enter") {
		getWeather();
	}
};

button.addEventListener("click", getWeather);
input.addEventListener("keyup", enter);
getWeather();
