var countFilms = 5;
var position = 0;

function getRandId() {
  var rand = Math.floor(Math.random() * 999000) + 1;
  var id = "tt";
  for (var i = 0; i < (7 - rand.toString().length); ++i) {
    id += "0";
  }
  id += rand.toString();
  return id;
}

function addSlide(film) {
  $("#list").append(`<li class="carousel__menu__list__element" ><p><strong>Title: </strong>${film.Title}</p>
                                                               <p><strong>Year: </strong> ${film.Year}</p>
                                                               <p><strong>Type: </strong> ${film.Type}</p>
                                                               <p><strong>ID: </strong> ${film.imdbID}</p>
                                                               <img class="element__poster" src= ${film.Poster}></li>`);
}

function addDefaultFilms() {
  for (var i = 0; i < countFilms; ++i){
    $.get(`http://www.omdbapi.com/?i=${getRandId()}&apikey=1f944386`).then(
      (data) => addSlide(data),
      (error) => $(".errors").html(`<p>${error}</p>`)
    );
  }       
}

$(document).ready(function() {
  addDefaultFilms();

  $("#prevButton").click(function() {
    if (position < 0) {
      position += 300;
      $("#nextButton").prop("disabled", false);
    }
    if (position == 0) {
      $("#prevButton").prop("disabled", true);
    }
    $(".carousel__menu__list")[0].style.marginLeft = position + "px";
  });

  $("#nextButton").click(function() {
    if (($("#list")[0].children.length - 3) * 300 > Math.abs(position)) {
      position -= 300;
      $("#prevButton").prop("disabled", false);
    }
    if (($("#list")[0].children.length - 3) * 300 == Math.abs(position)) {
      $("#nextButton").prop("disabled", true);
    }
    $("#list")[0].style.marginLeft = position + "px";    
  });

  $("#sendButton").click(function() {
    var searchString = $("#searchString")[0].value;
    $(".carousel__menu__list").empty();
    ajax(`http://www.omdbapi.com/?s=${searchString}&apikey=1f944386`).then(
      succeed => {
        for (var i = 0; i < succeed.Search.length; ++i) {
          addSlide(succeed.Search[i]);
        }
      },
      fail => $(".errors").html(`<p>${fail}</p>`)
    );
  });
});