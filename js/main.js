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
let btn = document.getElementById("butt");
console.log(btn);
let omdbKey = "e7e8f39f";
let wsKey = "9dbb6ad8f3d93c19f34df55e0c1d8839";

function render(dataMovie, dataws) {
    let moveCard = document.getElementById("cards");
    let template = '';
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
    console.log(template);
    moveCard.innerHTML = template;

    let wsCard = document.getElementById("ws");
    let templatews = `
    <div class="col-sm-12">
          <div class="card shadow-0 border">
            <div class="card-body p-4">
              <h4 class="mb-1 sfw-normal">${dataws.location.name}, ${dataws.location.country}</h4>
              <p class="mb-2">Current temperature: <strong>${dataws.current.temperature}°C</strong></p>
              <p>Feels like: <strong>${dataws.current.feelslike}°C</strong></p>
              <div class="d-flex flex-row align-items-center">
                <p class="mb-0 me-4">${dataws.current.weather_descriptions}</p>
                <img src="${dataws.current.weather_icons}" height="50">
              </div>
  
            </div>
          </div>
  
        </div>`;
    console.log(templatews);
    wsCard.innerHTML = templatews;
}


btn.addEventListener("click", function (e) {
    e.preventDefault();
    let select = document.getElementById("Cities");
    
    let cities = select.value;
    
    let urlws = `http://api.weatherstack.com/current?access_key=${wsKey}&query=${cities}`;
    console.log(urlws);
    let omdbUrl = `http://www.omdbapi.com/?apikey=${omdbKey}&s=${cities}`;
    console.log(omdbUrl);
    let dataMovie;
    let dataws;
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
                render(dataMovie, dataws);
            }).catch((error) => {
                console.log(error);
            });
    
} );
    