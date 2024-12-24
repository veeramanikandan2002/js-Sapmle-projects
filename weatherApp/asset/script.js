
const cityName = document.getElementById("place-para")
const inputField = document.getElementById("place-input")
const searchBtn = document.getElementById("search");
const celcious = document.getElementById("celcious")
const percentage = document.getElementById("degree")
const windSpeed = document.getElementById("kmhr")
const datepara = document.getElementById("date")
const userNOtFound = document.getElementById("cityNOtFound");
const allDataDiv = document.getElementById("all-data-div")
async function getData() {

  let value = inputField.value
  console.log(value)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=fee5aad1e24c84e40f0f5a01f70148fd `;

  const response = await fetch(url);
  if (!response.ok) {
    userNOtFound.innerHTML = "City Not Found"
    allDataDiv.style.display = "none"
  } else {

    const json = await response.json();

    celcious.innerHTML = Math.round(json.main.temp - 273.15) + "°C";
    cityName.innerHTML = json.name;
    percentage.innerHTML = json.main.humidity + "%";

    windSpeed.innerHTML = json.wind.speed + "Km/h";
    userNOtFound.innerHTML = ""
    allDataDiv.style.display = "block"
  }
}

searchBtn.addEventListener('click', () => {
  if (inputField.value == "") {
    console.log("helloo")
  }
  else {
    getData()
    date()
    inputField.value = ""
  }
})


function date(date, formate) {
  date = new Date();
  const Days = ['sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const Month = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"]

  let hr = date.getHours()
  let mi = date.getMinutes()
  let day = Days[date.getDay()]
  let dat = date.getDate()
  let mon = Month[date.getMonth()]
  let year = date.getFullYear()

  let newDate = hr + ":" + mi + "-" + day + "," + dat + "" + mon + "" + year
  console.log(newDate)
  datepara.innerHTML = newDate

}
