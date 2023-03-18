const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    wIcon = wrapper.querySelector(".weather-part img"),
    arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e => {
    //* if user pressed enter btn and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

var apiKey = "ce40001b24d795dd3da24b54fbbac5b5";
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetchData();
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchData();
}

function fetchData() {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.add("error");
        infoTxt.innerText = `${inputField.value} is not a valid city name`;
        inputField.value = "";
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;

        if (id == 800) {
            wIcon.src = "icons/sunny.png";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "icons/stormy.png";
        } else if (id >= 600 && id <= 622) {
            wIcon.src = "icons/snowy.png";
        } else if (id >= 701 && id <= 781) {
            wIcon.src = "icons/foggy.png";
        } else if (id >= 801 && id <= 804) {
            wIcon.src = "icons/cloudy.png";
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            wIcon.src = "icons/rainy.png";
        }

        wrapper.querySelector(".temp .numb").innerText = Math.round(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.round(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
    infoTxt.classList.remove("pending", "error");
    inputField.value = "";
});

// function requestApi(city) {
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'b203046facmsh4cf9f8dc70b3546p170e87jsnb5aff229ac3a',
//             'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
//         }
//     };
    
//     fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?q=${city}`, options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
// }


//     let api = `https://bulk.openweathermap.org/snapshot/weather_zip_us.csv.gz?appid=6912df702304d8237786d1c941947540`;
    
//     // `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=6912df702304d8237786d1c941947540`;
//     infoTxt.innerText = "Getting weather details...";
//     infoTxt.classList.add("pending");
//     fetch(api).then(response => response.json()).then(result => weatherDetails(result));
// }

// function weatherDetails(info){
//     console.log(info);
// }

