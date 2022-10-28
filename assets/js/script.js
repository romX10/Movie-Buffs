var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");
const omdbUrl = "http://www.omdbapi.com/?";
const omdbApi = "apikey=c5b2da48";
const baseUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?";
const baseApi = "api-key=kKm2DXzBnmrQRL4M3LboEX4YO1Kx54Ku";
const results = document.getElementById("search-results");

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  const userSearchInput = searchInput.value;
  getMovie(userSearchInput);
});

function getMovie(title) {
  return fetch(`${omdbUrl}s=${title}&${omdbApi}`)
    .then((res) => res.json())
    .then((data) => {
      data.Search.forEach((item) => {
        var poster = item.Poster;
        var titleTrial = item.Title;
        var id = item.imdbID;
        console.log(data);
        fetch(`${omdbUrl}t=${titleTrial}&${omdbApi}`)
          .then((res) => res.json())
          .then((data) => {
            let score = data.imdbRating;
            let plot = data.Plot;
            let rated = data.Rated;
            postPoster(poster, titleTrial, id, score, plot, rated);
          });
      });
    });
}

function postPoster(poster, titleTrial, id, score, plot, rated) {
  var figure = document.createElement("figure"); //modal to create call api for review
  results.appendChild(figure);
  var image = document.createElement("img");
  image.setAttribute("src", poster);
  image.setAttribute("data-title", titleTrial);
  figure.appendChild(image);
  var figCaption = document.createElement("figcaption");
  figCaption.textContent = titleTrial; //target figure child with data-title attr titleTrial
  figure.appendChild(figCaption);
  var figCaption2 = document.createElement("figcaption");
  figCaption2.textContent = "IMDb id: " + id;
  figure.appendChild(figCaption2);
  var figCaption3 = document.createElement("figcaption");
  figCaption3.textContent = "IMDb score: " + score;
  figure.appendChild(figCaption3);
  var figCaption4 = document.createElement("figcaption");
  figCaption4.textContent = "Plot: " + plot;
  figure.appendChild(figCaption4);
  var figCaption5 = document.createElement("figcaption");
  figCaption5.textContent = "Rated: " + rated;
  figure.appendChild(figCaption5);
  console.log(titleTrial);
}

function getReviews(event) {
    console.log(event)
    var title = event.currentTarget.dataset.title
  fetch(`${baseUrl}query=${title}&${baseApi}`)
    .then((res) => res.json())
    .then((data) => {
      var parsedata = parseResult(data.results, title);
      console.log(parsedata);
    });
}


function parseResult(resultsarray, title) {
    // if (resultsarray !== null) {
        var finalResult = resultsarray.find((result) => {
            result["display_title"].toUpperCase() === title.toUpperCase();
        });
        return finalResult;
    // }
}

$("#search-results").on("click", "img", getReviews);