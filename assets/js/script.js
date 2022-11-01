window.onscroll = function() {stickyNav()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

const omdbUrl = "http://www.omdbapi.com/?";
const omdbApi = "apikey=c5b2da48";
const baseUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?";
const baseApi = "api-key=kKm2DXzBnmrQRL4M3LboEX4YO1Kx54Ku";
const results = document.getElementById("search-results");
const review = document.getElementById("reviewContent");
var parsedata = "";
const modal = document.getElementById("review");

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  const userSearchInput = searchInput.value;
  var oldSearch = document.querySelectorAll('.search-results');
  if (oldSearch){
    oldSearch.forEach(el => {results.removeChild(el)})
  }
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
  var figure = document.createElement("figure");
  results.appendChild(figure);
  figure.classList.add("card"); // adding bulma
  figure.classList.add("column");//more bulma
  figure.classList.add("search-results");
  var anchor = document.createElement("a");
  anchor.classList.add("js-modal-trigger");
  anchor.setAttribute("data-target", "#review");
  figure.appendChild(anchor);
  var image = document.createElement("img");
  image.setAttribute("src", poster);
  image.setAttribute("data-title", titleTrial);
  anchor.appendChild(image);
  var figCaption = document.createElement("figcaption");
  figCaption.classList.add("content");//adding bulma
  figCaption.classList.add("card-header-title");//more bulma
  figCaption.textContent = titleTrial;
  figure.appendChild(figCaption);
  var figCaption2 = document.createElement("figcaption");
  figCaption2.classList.add("content");//adding bulma
  figCaption2.textContent = "IMDb id: " + id;
  figure.appendChild(figCaption2);
  var figCaption3 = document.createElement("figcaption");
  figCaption3.classList.add("content");//adding bulma
  figCaption3.textContent = "IMDb score: " + score;
  figure.appendChild(figCaption3);
  var figCaption4 = document.createElement("figcaption");
  figCaption4.classList.add("content");//adding bulma
  figCaption4.textContent = "Plot: " + plot;
  figure.appendChild(figCaption4);
  var figCaption5 = document.createElement("figcaption");
  figCaption5.classList.add("content");//adding bluma
  figCaption5.textContent = "Rated: " + rated;
  figure.appendChild(figCaption5);
}

function getReviews(event) {
  var title = event.currentTarget.dataset.title;
  fetch(`${baseUrl}query=${title}&${baseApi}`)
    .then((res) => res.json())
    .then((data) => {
      var parsedata = parseResult(data.results, title);
      setModal(parsedata);
    });
}

function parseResult(resultsarray, title) {
  if (resultsarray === null) {
    return;
  }
  var finalResult = resultsarray.find(
    (result) => result["display_title"].toUpperCase() === title.toUpperCase()
  );
  return finalResult.summary_short;
}

function setModal(parsedata) {
  if (parsedata) {
    review.textContent = parsedata;
  } else {
    review.textContent = "No reviews found at this time.";
  }
  modal.classList.add('is-active');
}

function closeModal() {
    modal.classList.remove('is-active');
}

$("#search-results").on("click", "img", getReviews);

$("#close").on("click", closeModal);
