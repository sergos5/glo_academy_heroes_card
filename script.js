const cardWrapper = document.querySelector('.wrapper');
const cardBlock = document.querySelector('.card');
const moviesSelect = document.querySelector('.movies_select');
const title = document.querySelector('.title');


const replaceCc = (str) => {
    str = str.replace(/([A-Z])/g, " $1");
    str = str.replace(/([A-Z])/g, u => u.toLowerCase());
    return str;
};

const createMoviesList = (list) => {
    list.forEach((item) => {
        const option = document.createElement('option');
        option.setAttribute.value = item;
        option.textContent = item;
        moviesSelect.append(option);
    });
};

const showFilmSelectHeroes = (film) => {
    const cardBlockList = cardWrapper.querySelectorAll('.card');
    if (film === 'all') {
        title.textContent = 'All the heroes of the Marvel cinematic universe';
        cardBlockList.forEach((cardBlock) => cardBlock.style.display = 'block');
    } else {
        title.textContent = `The heroes of the film: "${film}"`;
        cardBlockList.forEach((cardBlock) => {
            cardBlock.style.display = 'none';
            const moviesList = cardBlock.querySelectorAll('.moviesBlock li');
            moviesList.forEach((movies) => {
                if (movies.textContent === film) {
                    console.log(cardBlock);
                    cardBlock.style.display = 'block';
                }
            });
        });
    }
};

const getMoviesList = (dataList) => {
    const moviesList = [];
    dataList.forEach((item) => {
        if (item['movies']) {
            item['movies'].forEach((film) => {
                if (!moviesList.includes(film)) moviesList.push(film);
            });
        }
    });
    createMoviesList(moviesList.sort());
};

const showCard = (data) => {

    getMoviesList(data);

    data.forEach((item) => {
        const newCard = cardBlock.cloneNode(true);
        const heroesImg = newCard.querySelector('img');
        const heroesName = newCard.querySelector('h2');
        const heroesDataList = newCard.querySelector('ul');

        heroesImg.setAttribute('src', `/datas/${item['photo']}`);
        heroesName.textContent = item['name'];

        for (let key in item) {
            const newHeroesDataListItem = document.createElement('li');
            if (key === 'name' || key === 'photo') continue;
            if (key === 'movies') {
                const newMoviesList = document.createElement('ul');
                newMoviesList.setAttribute('class', 'moviesBlock');
                newMoviesList.innerHTML = `<b>${key}:</b>`;
                heroesDataList.append(newMoviesList);
                item['movies'].forEach(movies => {
                    const newMoviesListItem = document.createElement('li');
                    newMoviesListItem.innerHTML = `${movies}`;
                    newMoviesListItem.style.marginLeft = 10 + 'px';
                    newMoviesList.append(newMoviesListItem);
                });
            } else {
                key = replaceCc(key);
                newHeroesDataListItem.innerHTML = `<b>${key}:</b> ${item[key]}`;
                heroesDataList.append(newHeroesDataListItem);
            }
        }
        newCard.style.display = 'block';
        cardWrapper.append(newCard);
    });
};

fetch('./datas/dbHeroes.json')
    .then(response => response.json())
    .then(data => showCard(data));

moviesSelect.addEventListener('change', () => {
    const filmSelect = moviesSelect[moviesSelect.selectedIndex].value;
    showFilmSelectHeroes(filmSelect);
});