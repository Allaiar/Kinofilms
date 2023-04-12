const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=2";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

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

function showMovies(data) {
  let elMovies = document.querySelector(".movies");
  console.log(data);
  document.querySelector(".movies").innerHTML = "";
  data.films.map((movie) => {
    let elMovie = document.createElement("div");
    elMovie.classList.add("movie");
    elMovie.innerHTML = `
      <div>
      <img class = 'img__card' src="${
        movie.posterUrl
      }" alt="films" width="350px" height="550px">
      </div>
      <div>
      <h4 class= "nameRu">${movie.nameEn}</h4>
      <h4 class= "nameRu">${movie.nameRu}</h4>
      <div class = "parent__texts">
      <div class = 'texts__card'>
      <p style="color: gray">Рейтинг</p>
      <p style="color: gray">Жанр</p>
      <p style="color: gray">Страна</p>
      <p style="color: gray">Год выпуска</p>
      <p style="color: gray">Длительность</p>
      <button class = "button__card">Смотреть онлайн</button>
      <button class = "button__card2">Написать отзыв</button>
      <select class="test__card">
                <option>+ Добавить в список</option>
                <option>Смотрю</option>
                <option>Просмотрено</option>
                <option>Отложено</option>
                <option>Брошено</option>
                <option>Запланировано</option>
                <option>Пересматриваю</option>
              </select>
      </div>
      <div class = 'texts__card2'>
      <p style="color: gray">${movie.rating}</p>
      <p style="color: gray">${movie.genres
        .map((genre) => genre.genre)
        .join(", ")}</p>
      <p style="color: gray">${movie.countries
        .map((country) => country.country)
        .join(", ")}</p>
      <p style="color: gray">${movie.year}</p>
      <p style="color: gray"> ${movie.filmLength}</p>
      </div>
      </div>
      </div>
          `;

    elMovie.style.display = "flex";
    elMovie.style.background = "#222222";
    elMovie.style.padding = "15px";
    elMovie.style.borderRadius = "20px";
    elMovie.style.marginTop = "50px";
    elMovies.style.marginTop = "50px";

    elMovies.append(elMovie);
    document.querySelector(".movies").append(elMovie);
  });
}
