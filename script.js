const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const ApiKey = "ebd6cd558c20576d8d95390c73577b7e";
const ulr =
	"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";

weatherForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const city = cityInput.value;

	if (city) {
		try {
			const waetherData = await getWeatherData(city);
			displayWeatherInfo(waetherData);
		} catch (error) {
			console.error(error);
			displayError(error);
		}
	} else {
		displayError("Please enter a city!");
	}
});

async function getWeatherData(city) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw new Error("Could not fetch weather data");
	}
	return await response.json();
}
async function displayWeatherInfo(data) {
	const {
		name: city,
		main: { temp, humidity },
		weather: [{ description, id }],
	} = data;

	card.textContent = "";
	card.style.display = "flex";
	const cityDisplay = document.createElement("h1");
	const tempDisplay = document.createElement("p");
	const humidityDisplay = document.createElement("p");
	const descDisplay = document.createElement("p");
	const emojDisplay = document.createElement("p");

	cityDisplay.textContent = city;
	tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
	humidityDisplay.textContent = `Humidity: ${humidity}%`;
	descDisplay.textContent = description;
	emojDisplay.textContent = getWeatherEmoji(id);

	cityDisplay.classList.add("cityDisplay");
	tempDisplay.classList.add("tempDisplay");
	humidityDisplay.classList.add("humidityDisplay");
	descDisplay.classList.add("descDisplay");
	emojDisplay.classList.add("emojDisplay");

	card.appendChild(cityDisplay);
	card.appendChild(tempDisplay);
	card.appendChild(humidityDisplay);
	card.appendChild(descDisplay);
	card.appendChild(emojDisplay);
}

function getWeatherEmoji(weatherId) {
	switch (true) {
		case weatherId >= 200 && weatherId < 300:
			return "🌧️";
		case weatherId >= 300 && weatherId < 400:
			return "🌧️";
		case weatherId >= 500 && weatherId < 600:
			return "🌦️";
		case weatherId >= 700 && weatherId < 800:
			return "⛈️";
		case weatherId === 800:
			return "☀️";
		case weatherId >= 801 && weatherId < 810:
			return "🌄";
		default:
			return "❓";
	}
}

function displayError(message) {
	const errorDisplay = document.createElement("p");
	errorDisplay.textContent = message;
	errorDisplay.classList.add("errorDisplay");

	card.textContent = "";
	card.style.display = "flex";
	card.appendChild(errorDisplay);
}
