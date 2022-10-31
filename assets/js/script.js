var searchButton = document.getElementById('searchButton')
var searchInput = document.getElementById('searchInput')
const baseUrl = "https://tastedive.com/api/similar?";
const baseApi = "k=443845-MovieBuf-E0P1IUCA";
const omdbUrl = "http://www.omdbapi.com/?";
const omdbApi = "apikey=c5b2da48";
const results = document.getElementById('search-results');



searchButton.addEventListener('click', function(e){
    e.preventDefault();
    const  userSearchInput = searchInput.value
    getMovie(userSearchInput)
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
    var figure = document.createElement("figure");//modal to create call api for review
    results.appendChild(figure);
    var image = document.createElement("img");
    image.setAttribute("src", poster);
    figure.appendChild(image);
    var figCaption = document.createElement("figcaption");
    figCaption.textContent = titleTrial;//target figure child with data-title attr titleTrial
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
  }
  
  getMovie(searchInput);



  
  
  