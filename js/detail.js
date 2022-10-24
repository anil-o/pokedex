function cleanBeforStartWithAboutContent() {
    document.getElementById('baseStats').innerHTML = ``;
    document.getElementById('evolution').innerHTML = ``;
    document.getElementById('about').innerHTML = ``;
    document.getElementById('moves').innerHTML = ``;
    document.getElementById('about-for-font-weight').classList.add('font-details-bold');
    document.getElementById('basestats-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('evolution-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('moves-for-font-weight').classList.remove('font-details-bold');
}


function cleanBeforStartWithBaseStatsContent() {
    document.getElementById('baseStats').innerHTML = ``;
    document.getElementById('about').innerHTML = ``;
    document.getElementById('evolution').innerHTML = ``;
    document.getElementById('moves').innerHTML = ``;
    document.getElementById('basestats-for-font-weight').classList.add('font-details-bold');
    document.getElementById('about-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('evolution-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('moves-for-font-weight').classList.remove('font-details-bold');
}


function cleanBeforStartWithEvolutionContent() {
    document.getElementById('baseStats').innerHTML = ``;
    document.getElementById('about').innerHTML = ``;
    document.getElementById('moves').innerHTML = ``;
    document.getElementById('evolution').innerHTML = ``;
    document.getElementById('evolution-for-font-weight').classList.add('font-details-bold');
    document.getElementById('basestats-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('about-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('moves-for-font-weight').classList.remove('font-details-bold');
}


function cleanBeforStartWithMovesContent() {
    document.getElementById('baseStats').innerHTML = ``;
    document.getElementById('evolution').innerHTML = ``;
    document.getElementById('about').innerHTML = ``;
    document.getElementById('moves').innerHTML = ``;
    document.getElementById('moves-for-font-weight').classList.add('font-details-bold');
    document.getElementById('evolution-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('basestats-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('about-for-font-weight').classList.remove('font-details-bold');
}


/**
 * back from details to overview pokemon
*/
function back() {
    let showDetailsContainer = document.getElementById('showDetailsContainer');
    showDetailsContainer.classList.remove('showDetailsContainer');
    showDetailsContainer.classList.add('d-none');
    let bodyContainer = document.getElementById('bodyContainer');
    bodyContainer.style = "overflow: unset;";
}


/**
 * slide to left
*/
function slideLeft() {
    if (forSlideAndFurtherFunctions <= 0) {
        forSlideAndFurtherFunctions = allPokemonNames.length - 1;
        showDetails(forSlideAndFurtherFunctions);
    } else {
        forSlideAndFurtherFunctions--;
        showDetails(forSlideAndFurtherFunctions);
    }
}


/**
 * slide to right
*/
function slideRight() {
    if (forSlideAndFurtherFunctions >= allPokemonNames.length - 1) {
        forSlideAndFurtherFunctions = 0;
        showDetails(forSlideAndFurtherFunctions);
    } else {
        forSlideAndFurtherFunctions++;
        showDetails(forSlideAndFurtherFunctions);
    }
}


/**
 * details for pokemon about
*/
async function about() {
    cleanBeforStartWithAboutContent();
    let url = pokemonInfosLimit['results'][forSlideAndFurtherFunctions]['url'];
    let response = await fetch(url);
    pokemonAbout = await response.json();
    let nextUrl = pokemonAbout['species']['url'];
    let nextResponse = await fetch(nextUrl);
    nextPokemonAbout = await nextResponse.json();
    renderAbout();
    let movesContainer = document.getElementById('movesContainer');
    if (movesContainer !== null) {
        movesContainer.classList.remove('moves-scroll');
    }
}


function renderAbout() {
    let about = document.getElementById('about');
    try {
        firstAbility = makeFirstLetterToUpperCase(pokemonAbout['abilities'][0]['ability']['name']);
    } catch (error) {
        firstAbility = 'this value does not exist for this pokemon';
    }

    try {
        generation = makeFirstLetterToUpperCase(nextPokemonAbout['generation']['name']);
    } catch (error) {
        generation = 'this value does not exist for this pokemon';
    }


    try {
        eggGroups = makeFirstLetterToUpperCase(nextPokemonAbout['egg_groups'][0]['name']);
    } catch (error) {
        eggGroups = 'this value does not exist for this pokemon';
    }

    try {
        species = makeFirstLetterToUpperCase(nextPokemonAbout['genera'][7]['genus']);
    } catch (error) {
        species = 'this value does not exist for this pokemon';
    }

    try {
        height = pokemonAbout['height'];
    } catch (error) {
        height = 'this value does not exist for this pokemon';
    }

    try {
        weight = pokemonAbout['weight'];
    } catch (error) {
        weight = 'this value does not exist for this pokemon';
    }

    try {
        basehappiness = nextPokemonAbout['base_happiness'];
    } catch (error) {
        basehappiness = 'this value does not exist for this pokemon';
    }
    about.innerHTML += templateAbout(firstAbility, generation, eggGroups, species, height, weight, basehappiness);
}


/**
 * details for pokemon base stats
*/
async function baseStats() {
    cleanBeforStartWithBaseStatsContent();
    let baseStats = document.getElementById('baseStats');
    let url = pokemonInfosLimit['results'][forSlideAndFurtherFunctions]['url'];
    let response = await fetch(url);
    pokemonBaseStats = await response.json();
    baseStats.innerHTML += templatebaseStats();
    let baseStatsProgressbar = document.getElementById('basestatsProgressbar');
    renderProgressBar(baseStatsProgressbar);
    let movesContainer = document.getElementById('movesContainer');
    if (movesContainer !== null) {
        movesContainer.classList.remove('moves-scroll');
    }
}


/**
 * render pokemon base stats progressbar
*/
function renderProgressBar(baseStatsProgressbar) {
    for (let i = 0; i < pokemonBaseStats['stats'].length; i++) {
        baseStatsProgressbar.innerHTML += templatebaseStatsProgressbar(i);
        let baseStatsprogressbarChild = document.getElementById('basestatsProgressbarWidth' + i);
        baseStatsprogressbarChild.style.width = `${pokemonBaseStats['stats'][i]['base_stat']}%`;
        if (pokemonBaseStats['stats'][i]['base_stat'] > 100) {
            let difference = pokemonBaseStats['stats'][i]['base_stat'] - 100;
            let basestatsProgressbarOverflow = document.getElementById('basestatsProgressbarOverflow' + i);
            basestatsProgressbarOverflow.innerHTML += `<div id="basestatsProgressbarWidthSecond${i}" class="basestats-progressbar-child-second"></div>`
            let basestatsProgressbarOverflowChild = document.getElementById('basestatsProgressbarWidthSecond' + i);
            basestatsProgressbarOverflowChild.style.width = `${difference}%`;
        }
    }
}


/**
 * details for pokemon evolution
*/
async function evolution() {
    cleanBeforStartWithEvolutionContent();
    speciesOfEvolutionUrl();
    let movesContainer = document.getElementById('movesContainer');
    if (movesContainer !== null) {
        movesContainer.classList.remove('moves-scroll');
    }
}


async function speciesOfEvolutionUrl() {
    let countforSlideAndFurtherFunctions = forSlideAndFurtherFunctions + 1;
    if (countforSlideAndFurtherFunctions > 905) {
        let evolution = document.getElementById('evolution');
        evolution.classList.remove('evolution-container');
        evolution.innerHTML += templateForNoEvolution();
    } else {
        let urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${countforSlideAndFurtherFunctions}/`;
        let responseSpecies = await fetch(urlSpecies);
        let pokemonSpecies = await responseSpecies.json();
        let url = pokemonSpecies['evolution_chain']['url'];
        let response = await fetch(url);
        let pokemonEvolution = await response.json();
        try {
            let firstEvolutionName = pokemonEvolution['chain']['species']['name'];
            let secondEvolutionName = pokemonEvolution['chain']['evolves_to'][0]['species']['name'];
            let thirdEvolutionName = pokemonEvolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
            renderEvolutionOfThePokemon(firstEvolutionName, secondEvolutionName, thirdEvolutionName);
        } catch (error) {
            let evolution = document.getElementById('evolution');
            evolution.classList.remove('evolution-container');
            evolution.innerHTML += templateForNoEvolution();
        }
    }
}


/**
 * render evolutiondetails
*/
async function renderEvolutionOfThePokemon(firstEvolutionName, secondEvolutionName, thirdEvolutionName) {
    firstEvolutionNameUpperCase = makeFirstLetterToUpperCase(firstEvolutionName);
    secondEvolutionNameUpperCase = makeFirstLetterToUpperCase(secondEvolutionName);
    thirdEvolutionNameUpperCase = makeFirstLetterToUpperCase(thirdEvolutionName);
    let urlFirstEvolution = `https://pokeapi.co/api/v2/pokemon/${firstEvolutionName}/`;
    let urlSecondEvolution = `https://pokeapi.co/api/v2/pokemon/${secondEvolutionName}/`;
    let urlThirdEvolution = `https://pokeapi.co/api/v2/pokemon/${thirdEvolutionName}/`;
    let responseFirstEvolution = await fetch(urlFirstEvolution);
    let responseSecondEvolution = await fetch(urlSecondEvolution);
    let responseThirdEvolution = await fetch(urlThirdEvolution);
    firstEvolution = await responseFirstEvolution.json();
    secondEvolution = await responseSecondEvolution.json();
    thirdEvolution = await responseThirdEvolution.json();
    let evolution = document.getElementById('evolution');
    evolution.innerHTML += evolutionTemplate(firstEvolutionNameUpperCase, secondEvolutionNameUpperCase, thirdEvolutionNameUpperCase);
}


/**
 * details for pokemon moves
*/
async function moves() {
    cleanBeforStartWithMovesContent();
    let url = pokemonInfosLimit['results'][forSlideAndFurtherFunctions]['url'];
    let response = await fetch(url);
    pokemonMoves = await response.json();
    let moves = document.getElementById('moves');
    if (pokemonMoves['moves'].length <= 0) {
        move = `<div class="move-if-no-exist">this value does not exist for this pokemon</div>`;
        moves.innerHTML += templateMoves(move);
        document.getElementById('movesDetail').classList.remove('moves-detail');
    } else {
        for (let i = 0; i < pokemonMoves['moves'].length; i++) {
            move = pokemonMoves['moves'][i]['move']['name']
            moves.innerHTML += templateMoves(move);
        }
        let movesContainer = document.getElementById('movesContainer');
        movesContainer.classList.add('moves-scroll');
    }
}