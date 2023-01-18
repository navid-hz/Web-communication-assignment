/**
 *  OMDb template
 *	Documentation: http://www.omdbapi.com/
 *  Generate an API key here: http://www.omdbapi.com/apikey.aspx
 */


/**
* According to documentation, you need at least 2 parameters when calling the API http://www.omdbapi.com/
* 1 Required parameter: apikey
* 2 Required parameter: One of the following i=, t= or s=
*
* 
* Example with parameter s=star trek
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek
*
* Example with parameter s=star trek AND y=2020
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&y=2020
*
* Example with parameter s=star trek AND type=series
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&type=series
*
*/
//selecting the button
let btn = document.getElementById("butt");

//API key
let omdbKey = "e7e8f39f";
let wsKey = "bf1c49b07c45aa82255e32195d1f8c44";

//function to create the movie cards and weather cards
function render(dataMovie, dataws) {
    //selecting the div where the cards will be created
    let moveCard = document.getElementById("cards");
    let template = '';
    //looping through the array of movies JSON and creating the cards
    dataMovie.Search.forEach((movie) => {
        template += `
            <div class="card shadow-0 border p-4 m-4">
                <h2>${movie.Title}</h2>
                <h5>Year: ${movie.Year}</h5>
                <div class="fakeimg">
                    <img src="${movie.Poster}" height="200">
                </div>
                <p>Type: ${movie.Type}</p>
                <p>ID: ${movie.imdbID}</p>
            </div>`
            });
    //inserting the cards into the div
    moveCard.innerHTML = template;

    //selecting the div where the weather cards will be created
    let wsCard = document.getElementById("ws");
    //creating the weather cards
    let templatews = `
    <div class="col-sm-12">
          <div class="card shadow-0 border">
            <div class="card-body p-4">
              <h4 class="mb-1 sfw-normal">${dataws.name}, ${dataws.sys.country}</h4>
              <p class="mb-2">Current temperature: <strong>${dataws.main.temp}°C</strong></p>
              <p>Feels like: <strong>${dataws.main.feels_like}°C</strong></p>
              <p>Max: <strong>${dataws.main.temp_max}°C</strong>, Min: <strong>${dataws.main.temp_min}°C</strong></p>
              <div class="d-flex flex-row align-items-center">
                <p class="mb-0 me-4">${dataws.weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${dataws.weather[0].icon}@2x.png">
              </div>
  
            </div>
          </div>
  
        </div>`;
    console.log(templatews);
    //inserting the weather cards into the div
    wsCard.innerHTML = templatews;
}

//function to get the data from and  APIs
btn.addEventListener("click", function (e) {
    e.preventDefault();
    //Get the value of the dropdown
    let select = document.getElementById("Cities");
    let cities = select.value;
    //creating the url for the APIs
    let urlws = `http://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${wsKey}&units=metric`;
    console.log(urlws);
    let omdbUrl = `http://www.omdbapi.com/?apikey=${omdbKey}&s=${cities}`;
    
    //JSON data from the APIs
    let dataMovie;
    let dataws;
    //fetching the data from the APIs
    fetch(omdbUrl).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response.json();
        }}).then((data) => {
            dataMovie = data;
            return fetch(urlws, {method: 'GET', });
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }}).then((data) => {
                dataws = data;
                console.log(data);
                console.log(dataMovie);
                //calling the render function for creating the cards
                render(dataMovie, dataws);
            }).catch((error) => {
                console.log(error);
            });
    
});
    