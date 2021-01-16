   // telling html to run after input has been given
   $(document).ready(function () {
    $("#search").on("click", function () {
      // get element value with jquery
      var searchValue = $("#searchValue").val();
      $("#searchValue").val("");
      // run logic to get data from API
      // tutor help
      console.log (searchValue, "button works");
      weatherSearch(searchValue);
    });

    $("searchValue").keypress(function (event) {
    // try to use keyCode === 13
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#search").click();
    }
    });

 
    // ************************Need the below line 76, 78, 85 to recall search
    $('[name="add-city-button"]').on("click", function () {
    // need prevent default for page to load
    event.preventDefault();
  });


// Function to display an image and text depending on the temperature
function whatToWear(temperature){

console.log("Inside What to wear");
console.log("Temperature=" + temperature);

 
 if(temperature >=0 && temperature <=75){
	  var img = document.createElement('img'); 
	img.src =  
	'../Style-With-My-Weather-App-main/images/winter.jpg'; 
	img.style.height='500px';
	img.style.width ='500px';
	// CLear the previous content
	 document.getElementById('imagePlaceHolder').innerHTML = "";
	 document.getElementById('imagePlaceHolder').appendChild(img); 
				
	var link1 = document.createElement('a');
	  link1.target = '_blank';
	  link1.href = 'https://www.amazon.com/s?k=pullover';
	  link1.innerText = 'Pull Over';
	 
	  var container = document.getElementById('link1');
	   document.getElementById('link1').innerHTML = "";
	  container.appendChild(link1);
	  
	  var link2 = document.createElement('a');
	  link2.target = '_blank';
	  link2.href = 'https://www.amazon.com/s?k=pullover';
	  link2.innerText = 'Sweater';
	 
	  var container = document.getElementById('link2');
	   document.getElementById('link2').innerHTML = "";
	  container.appendChild(link2);
 }else if(temperature >=75){
	   var img2 = document.createElement('img'); 
	 img2.src =  
	'../Style-With-My-Weather-App-main/images/summer.jpg'; 
	img2.style.height='500px';
	img2.style.width ='500px';
	// CLear the previous content
	 document.getElementById('imagePlaceHolder').innerHTML = "";
	 document.getElementById('imagePlaceHolder').appendChild(img2); 
				
	var link1 = document.createElement('a');
	  link1.target = '_blank';
	  link1.href = 'https://www.amazon.com/s?k=summer+hat&ref=nb_sb_noss_1';
	  link1.innerText = 'Summer Hat';
	 
	  var container = document.getElementById('link1');
	   document.getElementById('link1').innerHTML = "";
	  container.appendChild(link1);
	  
	  var link2 = document.createElement('a');
	  link2.target = '_blank';
	  link2.href = 'https://www.amazon.com/s?k=bikini&ref=nb_sb_noss_2';
	  link2.innerText = 'Bikini';
	 
	  var container = document.getElementById('link2');
	   document.getElementById('link2').innerHTML = "";
	  container.appendChild(link2);
 }
}	


function weatherSearch(searchValue) {
  var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";
  console.log(APIKey);

  var queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + APIKey;
  console.log(queryURL, "this is with search results");

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $("#icon0").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
      $(".wind").text(`Wind Speed: ${Math.round(response.wind.speed)}MPH`);
      // $(".humidity").text("Humidity: " + response.main.humidity);
      $(".humidity").text(`Humidity: ${response.main.humidity}%`);

      
      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
	  
	  whatToWear(tempF);

      // add temp content to html
      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempF").text(`Temperature: ${Math.round((response.main.temp - 273.15) * 1.8 + 32)}°F`);
      $(".tempC").text(`Temperature: ${Math.round((response.main.temp - 273.15) )}°C`);



      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + tempF);

      lat = response.coord.lat;
      lon = response.coord.lon;
      console.log("This is lat and lon from weather function", lat, lon);
      forecast(lat, lon); 

  
    });
    $(".daysForecast1").html(`${moment().add(1, "d").format("MMMM DD, YYYY")}`);
    $(".daysForecast2").html(`${moment().add(2, "d").format("MMMM DD, YYYY")}`);
    $(".daysForecast3").html(`${moment().add(3, "d").format("MMMM DD, YYYY")}`);
    $(".daysForecast4").html(`${moment().add(4, "d").format("MMMM DD, YYYY")}`);
    $(".daysForecast5").html(`${moment().add(5, "d").format("MMMM DD, YYYY")}`);
    $(".daysForecast6").html(`${moment().add(6, "d").format("MMMM DD, YYYY")}`);

  }

  function forecast(lat, lon) {
    //replaced (lat,lon) with (searchValue) and humidity showed up
    var APIKey = "76867f1d9d820e6fd45b355d5a55ddc8";

    // var part = hourly;
    console.log("Forecast", APIKey);
  
    // excluded minuetly
    var oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=currently,alerts&appid=" + APIKey;
    // var fiveDayForecast= "http://api.openweathermap.org/data/2.5/uvi?lat=" +lat+ "&lon=" +lon+ "&appid=" +APIKey;
    console.log("This is the var fivDayForecast: ", oneCallAPI);

    $.ajax({
      // url: fiveDayForecast,
      url: oneCallAPI,
      method: "GET",
    }).then(function (response) {

      $("#hour1").text(`Hourly: ${response.hourly[0].temp}`);
      $("#hour2").text(`Hourly: ${response.hourly[1].temp}`);
      $("#hour3").text(`Hourly: ${response.hourly[2].temp}`);
      $("#hour4").text(`Hourly: ${response.hourly[3].temp}`);
      $("#hour5").text(`Hourly: ${response.hourly[4].temp}`);
      $("#hour6").text(`Hourly: ${response.hourly[5].temp}`);
      $("#hour7").text(`Hourly: ${response.hourly[6].temp}`);





      


      $("#icon1").attr("src","https://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png");
      $("#humidity1").text(`Humidity: ${response.daily[0].humidity}%`);
      $("#temp1").text(`Temperature: ${Math.round((response.daily[0].temp.day - 273.15) * 1.8 + 32)}°F`);
      $("#temp1C").text(`Temperature: ${Math.round((response.daily[0].temp.day - 273.15))}°C`);
      // trying to get both F and C to fit in 1 line
      $("#tempall").text(`${Math.round((response.daily[0].temp.day - 273.15) * 1.8 + 32)})`/` (${Math.round(response.daily[0].temp.day - 273.15)} C`);


      console.log(response.daily[0].temp);

      $("#icon2").attr("src","https://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png");
      $("#humidity2").text(`Humidity: ${response.daily[1].humidity}%`);
      $("#temp2").text(`Temp(F): ${Math.round((response.daily[1].temp.day - 273.15) * 1.8 + 32)}°F`);
      $("#temp2C").text(`Temp (C): ${Math.round((response.daily[1].temp.day - 273.15))}°C`);


      $("#icon3").attr("src","https://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon +"@2x.png");
      $("#humidity3").text(`Humidity: ${response.daily[2].humidity}%`);
      $("#temp3").text(`Temperature(F): ${Math.round((response.daily[2].temp.day - 273.15) * 1.8 + 32)}`);
      $("#temp3C").text(`Temperature(C): ${Math.round((response.daily[2].temp.day - 273.15))}`);


      $("#icon4").attr("src","https://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png");
      $("#humidity4").text(`Humidity: ${response.daily[3].humidity}%`);
      $("#temp4").text(`Temperature(F): ${Math.round((response.daily[3].temp.day - 273.15) * 1.8 + 32)}`);
      $("#temp4C").text(`Temperature (C): ${Math.round((response.daily[3].temp.day - 273.15))}`);


      $("#icon5").attr("src", "https://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png");
      $("#humidity5").text(`Humidity: ${response.daily[4].humidity}%`);
      $("#temp5").text(`Temperature (F): ${Math.round((response.daily[4].temp.day - 273.15) * 1.8 + 32)}`);
      $("#temp5C").text(`Temperature (C): ${Math.round((response.daily[4].temp.day - 273.15))}`);


      $("#icon6").attr("src", "https://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png");
      $("#humidity6").text(`Humidity: ${response.daily[4].humidity}%`);
      $("#temp6").text(`Temperature (F): ${Math.round((response.daily[4].temp.day - 273.15) * 1.8 + 32)}`);
      $("#temp6C").text(`Temperature (C): ${Math.round((response.daily[4].temp.day - 273.15))}`);



      forecast(searchValue); //calling the forecast function
    });
  }

  });







