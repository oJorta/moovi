const genres = [
    "Sci-Fi", // 0
    "Romance", // 1
    "Aventura", // 2
    "Comédia", // 3
    "Terror", // 4
    "Animação", // 5
    "Infantil", // 6
    "Ação", // 7
];

const movies = [
    {
        id: 1,
        title: 'Star Wars: Episode I - The Phantom Menace',
        synopsis: 'Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to reclaim their old glory.',
        duration: 136,
        releaseDate: '1999-05-19',
        director: 'George Lucas',
        producer: 'Lucasfilm',
        poster: 'download1.jpg',
        genreId: 0,
        rate: 7.7
    },
    {
        id: 2,
        title: 'Star Wars: Episode II - Attack of the Clones',
        synopsis: 'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi investigates an assassination attempt on the Senator and discovers a secret clone army crafted for the Jedi.',
        duration: 142,
        releaseDate: '2002-05-16',
        director: 'George Lucas',
        producer: 'Lucasfilm',
        poster: 'download2.jpg',
        genreId: 0,
        rate: 8.2
    },
    {
        id: 3,
        title: 'Star Wars: Episode III - Revenge of the Sith',
        synopsis: 'Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.',
        duration: 140,
        releaseDate: '2005-05-19',
        director: 'George Lucas',
        producer: 'Lucasfilm',
        poster: 'download3.jpg',
        genreId: 0,
        rate: 9.0
    },
    {
        id: 4,
        title: 'Star Wars: Episode IX - The Rise of Skywalker',
        synopsis: 'The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches its peak bringing the Skywalker saga to its end.',
        duration: 142,
        releaseDate: '2019-12-20',
        director: 'J.J. Abrams',
        producer: 'Lucasfilm',
        poster: 'download4.jpg',
        genreId: 0,
        rate: 2.7
    },
    {
        id: 5,
        title: 'Indiana Jones and the Raiders of the Lost Ark',
        synopsis: 'Archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis can obtain its awesome powers.',
        duration: 115,
        releaseDate: '1981-06-12',
        director: 'Steven Spielberg',
        producer: 'Lucasfilm',
        poster: 'download5.jpg',
        genreId: 2,
        rate: 9.5
    },
    {
        id: 6,
        title: 'Indiana Jones and the Temple of Doom',
        synopsis: 'In 1935, Indiana Jones arrives in India, still part of the British Empire, and is asked to find a mystical stone. He then stumbles upon a secret cult committing enslavement and human sacrifices in the catacombs of an ancient palace.',
        duration: 118,
        releaseDate: '1984-05-23',
        director: 'Steven Spielberg',
        producer: 'Lucasfilm',
        poster: 'download6.jpg',
        genreId: 2,
        rate: 8.1
        },
    {
        id: 7,
        title: 'Ace Ventura: Pet Detective',
        synopsis: 'A goofy detective specializing in animals goes in search of the missing mascot of the Miami Dolphins.',
        duration: 86,
        releaseDate: '1994-02-04',
        director: 'Tom Shadyac',
        producer: 'Morgan Creek Productions',
        poster: 'download7.jpg',
        genreId: 3,
        rate: 7.6
    },
    {
        id: 8,
        title: 'Ace Ventura: When Nature Calls',
        synopsis: 'Ace Ventura, Pet Detective, returns from a spiritual quest to investigate the disappearance of a rare white bat, the symbol of an African tribe.',
        duration: 90,
        releaseDate: '1995-11-10',
        director: 'Steve Oedekerk',
        producer: 'Morgan Creek Productions',
        poster: 'download8.jpg',
        genreId: 3,
        rate: 8.8
    },
    {
        id: 9,
        title: 'Mamma Mia!',
        synopsis: 'The story of a bride-to-be trying to find her real father told using hit songs by the popular 1970s group ABBA.',
        duration: 108,
        releaseDate: '2008-07-18',
        director: 'Phyllida Lloyd',
        producer: 'Universal Pictures',
        poster: 'download9.jpg',
        genreId: 1,
        rate: 5.9
    },
    {
        id: 10,
        title: 'How to Lose a Guy in 10 Days',
        synopsis: 'Benjamin Barry is an advertising executive and ladies man who, to win a big campaign, bets that he can make a woman fall in love with him in 10 days.',
        duration: 116,
        releaseDate: '2003-02-07',
        director: 'Donald Petrie',
        producer: 'Paramount Pictures',
        poster: 'download10.jpg',
        genreId: 1,
        rate: 7.1
    },
    {
        id: 11,
        title: 'The Wolf of Wall Street',
        synopsis: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
        duration: 180,
        releaseDate: '2013-12-25',
        director: 'Martin Scorsese',
        producer: 'Paramount Pictures',
        poster: 'download11.jpg',
        genreId: 3,
        rate: 9.3
    },
    {
        id: 12,
        title: 'Gremlins',
        synopsis: 'A boy inadvertently breaks three important rules concerning his new pet and unleashes a horde of malevolently mischievous monsters on a small town.',
        duration: 106,
        releaseDate: '1984-06-08',
        director: 'Joe Dante',
        producer: 'Warner Bros.',
        poster: 'download12.jpg',
        genreId: 4,
        rate: 4.6
    },
    {
        id: 13,
        title: 'Scream',
        synopsis: 'A year after the murder of her mother, a teenage girl is terrorized by a new killer, who targets the girl and her friends by using horror films as part of a deadly game.',
        duration: 111,
        releaseDate: '1996-12-20',
        director: 'Wes Craven',
        producer: 'Dimension Films',
        poster: 'download13.jpg',
        genreId: 4,
        rate: 6.8
    },
    {
        id: 14,
        title: 'Scream 2',
        synopsis: 'Two years after the first series of murders, as Sidney acclimates to college life, someone donning the Ghostface costume begins a new string of killings.',
        duration: 120,
        releaseDate: '1997-12-12',
        director: 'Wes Craven',
        producer: 'Dimension Films',
        poster: 'download14.jpg',
        genreId: 4,
        rate: 7.1
    },
    {
        id: 15,
        title: 'Cars 2',
        synopsis: 'Star race car Lightning McQueen and his pal Mater head overseas to compete in the World Grand Prix race. But the road to the championship becomes rocky as Mater gets caught up in an intriguing adventure of his own: international espionage.',
        duration: 106,
        releaseDate: '2011-06-24',
        director: 'John Lasseter',
        producer: 'Pixar Animation Studios',
        poster: 'download15.jpg',
        genreId: 5,
        rate: 8.0
    },
    {
        id: 16,
        title: 'My Big Fat Greek Wedding',
        synopsis: 'A young Greek woman falls in love with a non-Greek and struggles to get her family to accept him while she comes to terms with her heritage and cultural identity.',
        duration: 95,
        releaseDate: '2002-02-22',
        director: 'Joel Zwick',
        producer: 'Gold Circle Films',
        poster: 'download16.jpg',
        genreId: 1,
        rate: 10.0
    },
    {
        id: 17,
        title: 'Spy Kids',
        synopsis: 'The children of secret-agent parents must save them from danger.',
        duration: 88,
        releaseDate: '2001-03-30',
        director: 'Robert Rodriguez',
        producer: 'Dimension Films',
        poster: 'download17.jpg',
        genreId: 6,
        rate: 6.3
    },
    {
        id: 18,
        title: 'World War Z',
        synopsis: 'Former United Nations employee Gerry Lane traverses the world in a race against time to stop a zombie pandemic that is toppling armies and governments and threatening to destroy humanity itself.',
        duration: 116,
        releaseDate: '2013-06-21',
        director: 'Marc Forster',
        producer: 'Paramount Pictures',
        poster: 'download18.jpg',
        genreId: 0,
        rate: 5.7
    },
    {
        id: 19,
        title: 'Jurassic Park',
        synopsis: 'During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.',
        duration: 127,
        releaseDate: '1993-06-11',
        director: 'Steven Spielberg',
        producer: 'Universal Pictures',
        poster: 'download19.jpg',
        genreId: 0,
        rate: 9.2
    },
    {
        id: 20,
        title: 'John Wick',
        synopsis: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
        duration: 101,
        releaseDate: '2014-10-24',
        director: 'Chad Stahelski',
        producer: 'Summit Entertainment',
        poster: 'download20.jpg',
        genreId: 7,
        rate: 7.4
    },
    {
        id: 21,
        title: 'Pacific Rim',
        synopsis: 'As a war between humankind and monstrous sea creatures wages on, a former pilot and a trainee are paired up to drive a seemingly obsolete special weapon in a desperate effort to save the world from the apocalypse.',
        duration: 131,
        releaseDate: '2013-07-12',
        director: 'Guillermo del Toro',
        producer: 'Legendary Pictures',
        poster: 'download21.jpg',
        genreId: 0,
        rate: 8.3
    }
];

const moviesContainer = document.getElementById('movies-container');

movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    // Obter o nome do gênero usando o índice genreId
    const genreName = genres[movie.genreId]; // Lembre-se de subtrair 1, pois os índices em arrays começam em 0

    movieCard.innerHTML = `
        <img src="../Posters/${movie.poster}" alt="Poster do Filme" class="movie-poster">
        <div class="movie-details">
            <h2 class="movie-title">${movie.title}</h2>
            <p class="movie-synopsis">${movie.synopsis}</p>
            <p class="movie-info"><strong>Duração:</strong> ${movie.duration} min</p>
            <p class="movie-info"><strong>Gênero:</strong> ${genreName}</p>
            <p class="movie-info"><strong>Ano de Lançamento:</strong> ${new Date(movie.releaseDate).getFullYear()}</p>
            <p class="movie-info"><strong>Diretor:</strong> ${movie.director}</p>
            <p class="movie-info"><strong>Produtora:</strong> ${movie.producer}</p>
            <p class="movie-info"><strong>Avaliação:</strong> ${movie.rate} / 10</p>
            <button class="rent-button">Alugar</button>
        </div>
    `;

    moviesContainer.appendChild(movieCard);
});