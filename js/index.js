const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  const resData = await resp.json();
  showMovies(resData);
}

function getClassByRate(rate) {
  if (rate >= 7) {
    return "green";
  } else if (rate < 7 && rate >= 5) {
    return "orange";
  } else if (rate < 5) {
    return "red";
  }
}
// function getClassByRate(rate, total) {
//   let rating = (rate / total) * 100;

//   if (rating >= 70) {
//     return 'green';
//   } else if (rating >= 50 && rating < 70) {
//     return 'orange';
//   } else {
//     return 'red';
//   }
// }

function showMovies(data) {
  let elMovies = document.querySelector(".movies");
  console.log(data);
  document.querySelector(".movies").innerHTML = "";
  data.films.map((movie) => {
    let elMovie = document.createElement("div");
    elMovie.classList.add("movie");
    elMovie.innerHTML = `
        <div>
        <img src = ${
          movie.posterUrl
        } alt = 'films'/ width = '350px' / height = '550px'>
        <a href="../html/cards.html" class = 'model__cards'>
        <h4 style = 'color: gray'>${movie.nameRu}</h4>
        </a>
        ${
          movie.rating &&
          `
            <div class="movie__average movie__average--${getClassByRate(
              movie.rating
            )}">${movie.rating}</div>
            `
        }
          </div>
        <br></br>
        </div>
        `;

    elMovies.style.display = "flex";
    elMovies.style.alignItems = "center";
    elMovies.style.justifyContent = "space-between";
    elMovies.style.flexWrap = "wrap";
    elMovies.style.marginTop = "50px";

    elMovie.addEventListener("click", () => openModal(movie.filmId));
    elMovies.append(elMovie);
    document.querySelector(".movies").append(elMovie);

  });
}

const search = document.querySelector(".header__search");
const form = document.querySelector("form");
const button = document.querySelector(".search");

button.addEventListener("click", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;

  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = "";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;

  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = "";
  }
});

const modal = document.querySelector(".modal");

async function openModal(id) {
  const res = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  const resData = await res.json();

  modal.classList.add("show");

  modal.innerHTML = `
  <div class='modal_window'>
  <img class='modal_window-img' src = ${
    resData.posterUrl
  } alt='photo'/ width = '350px' / height = '550px'>
  <h2 style = 'color: rgb(251, 190, 22)'>
  ${resData.nameRu}
  </h2>
  <p style = 'color: gray'>Жанр : </p>
        <div class = "genres">
        <p style = 'color: gray'>${resData.genres.map(
          (genre) => `${genre.genre}`
        )}</p>
        </div>
        <p style = 'color: gray'>Страна : ${resData.countries.map(
          (country) => `${country.country}`
        )}</p>
        <p style = 'color: gray'>Год выпуска : ${resData.year}</p>
        <p style = 'color: gray'>Длительность : ${resData.filmLength}</p>
  <button class='close'>Закрыть</button>
  </div>
  `;

  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => {
    closeModal();
  });

  
}

function closeModal() {
  modal.classList.remove("show");
  modal.innerHTML = "";
}
