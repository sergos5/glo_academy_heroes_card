const cardWrapper = document.querySelector('.wrapper');
const cardBlock = document.querySelector('.card');

const replaceCc = (str) => {
    str = str.replace(/([A-Z])/g, " $1");
    str = str.replace(/([A-Z])/g, u => u.toLowerCase());
    return str;
};

const showCard = (data) => {
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
    .then(data => {
        showCard(data);
    });