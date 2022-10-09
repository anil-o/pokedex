let allPokemonNames = [];
let pokeCounter = 20;
let nextPokemonCounter = 0;
let firstLetterForFilterPokemon;
let currentPokemonForFilter;
let inactiveScrollForMorePokemons = true;
let pokemonAbout;
let nextPokemonAbout;
let pokemonBaseStats;
let firstEvolution;
let secondEvolution;
let thirdEvolution;
let pokemonMoves;
let pokemonShowDetails;
let beforeIndexForOtherAreas;
let forSlideAndFurtherFunctions;
let urlLimit;
let responseLimit;
let pokemonInfosLimit;

async function init() {
    loadPokemon();
    morePokemonsOnScroll();
    pushAllPokemonNames();
    await test();
    await secondtest();
    await thirdtest();
}

async function test() {
    let url = `https://pokeapi.co/api/v2/pokemon/1/`;
    let response = await fetch(url);
    let pokemonInfos = await response.json();
    console.log(pokemonInfos);
}

async function secondtest() {
    let url = `https://pokeapi.co/api/v2/pokemon-species/1/`;
    let response = await fetch(url);
    let pokemonInfos = await response.json();
    console.log(pokemonInfos);
}


async function thirdtest() {
    let url = `https://pokeapi.co/api/v2/evolution-chain/2/`;
    let response = await fetch(url);
    let pokemonInfos = await response.json();
    console.log(pokemonInfos);
}

/**
 * load Pokemon
*/
async function loadPokemon() {
    await renderPokemon();
}



/**
 * render Pokemon cave
*/
async function renderPokemon() {
    let pokemoncave = document.getElementById('pokemoncave');
    pokemoncave.innerHTML = ``;
    urlLimit = `https://pokeapi.co/api/v2/pokemon/?limit=1154`;
    responseLimit = await fetch(urlLimit);
    pokemonInfosLimit = await responseLimit.json();
    for (let i = 0; i < pokeCounter; i++) {
        if (pokemonInfosLimit['results'][i]['url'] == ``) {
            continue;
        } else {
            let url = pokemonInfosLimit['results'][i]['url'];
            let response = await fetch(url);
            let pokemonInfos = await response.json();
            let j = pokemonInfos['id'];
            beforeIndexForOtherAreas = j;
            let currentPokemonBeforeUpperCase = pokemonInfos['name'];
            let currentPokemonAfterUpperCase = makeFirstLetterToUpperCase(currentPokemonBeforeUpperCase);
            let pokemonImage = pokemonInfos['sprites']['other']['dream_world']['front_default'];
            if (j <= 9) {
                j = '00' + j;
            }
            if (j <= 99 && j >= 10) {
                j = '0' + j;
            }
            if (j >= 100) {
                j;
            }
            if (pokemonInfos['moves'].length > 1) {
                let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
                let pokemonSecondMove = pokemonInfos['moves'][1]['move']['name'];
                pokemoncave.innerHTML += templateRenderPokemonCaveIfMovesGreaterThanOne(currentPokemonAfterUpperCase, pokemonImage, pokemonFirstMove, pokemonSecondMove, j, i);
            } else {
                let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
                pokemoncave.innerHTML += templateRenderPokemonCaveIfOnlyOneMove(currentPokemonAfterUpperCase, pokemonImage, pokemonFirstMove, j, i);
            }
            loadBgColorDependOnTypes(pokemonInfos, i);
        }
    }
}


async function renderNextPokemon() {
    for (let i = nextPokemonCounter; i < pokeCounter; i++) {
        if (pokemonInfosLimit['results'][i]['url'] == ``) {
            continue;
        } else {
            let url = pokemonInfosLimit['results'][i]['url'];
            let response = await fetch(url);
            let pokemonInfos = await response.json();
            let j = pokemonInfos['id'];
            beforeIndexForOtherAreas = j;
            let currentPokemonBeforeUpperCase = pokemonInfos['name'];
            let currentPokemonAfterUpperCase = makeFirstLetterToUpperCase(currentPokemonBeforeUpperCase);
            let pokemonImage = pokemonInfos['sprites']['other']['dream_world']['front_default'];
            if (j <= 9) {
                j = '00' + j;
            }
            if (j <= 99 && j >= 10) {
                j = '0' + j;
            }
            if (j >= 100) {
                j;
            }
            if (pokemonInfos['moves'].length > 1) {
                let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
                let pokemonSecondMove = pokemonInfos['moves'][1]['move']['name'];
                pokemoncave.innerHTML += templateRenderPokemonCaveIfMovesGreaterThanOne(currentPokemonAfterUpperCase, pokemonImage, pokemonFirstMove, pokemonSecondMove, j, i);
            } else {
                let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
                pokemoncave.innerHTML += templateRenderPokemonCaveIfOnlyOneMove(currentPokemonAfterUpperCase, pokemonImage, pokemonFirstMove, j, i);
            }
            loadBgColorDependOnTypes(pokemonInfos, i);
        }
    }
}

function loadBgColorDependOnTypes(pokemonInfos, i) {
    let type = pokemonInfos['types'][0]['type']['name'];

    if (type == 'grass') {
        document.getElementById('pokemonfortype' + i).classList.add('grass');
    }
    if (type == 'fire') {
        document.getElementById('pokemonfortype' + i).classList.add('fire');
    }
    if (type == 'water') {
        document.getElementById('pokemonfortype' + i).classList.add('water');
    }
    if (type == 'electric') {
        document.getElementById('pokemonfortype' + i).classList.add('electric');;
    }
    if (type == 'bug') {
        document.getElementById('pokemonfortype' + i).classList.add('bug');
    }
    if (type == 'normal') {
        document.getElementById('pokemonfortype' + i).classList.add('normal');
    }
    if (type == 'poison') {
        document.getElementById('pokemonfortype' + i).classList.add('poison');
    }
    if (type == 'ground') {
        document.getElementById('pokemonfortype' + i).classList.add('ground');
    }
    if (type == 'fairy') {
        document.getElementById('pokemonfortype' + i).classList.add('fairy');
    }
    if (type == 'fighting') {
        document.getElementById('pokemonfortype' + i).classList.add('fighting');
    }
    if (type == 'ghost') {
        document.getElementById('pokemonfortype' + i).classList.add('ghost');
    }
    if (type == 'rock') {
        document.getElementById('pokemonfortype' + i).classList.add('rock');
    }
    if (type == 'psychic') {
        document.getElementById('pokemonfortype' + i).classList.add('psychic');
    }
    if (type == 'dragon') {
        document.getElementById('pokemonfortype' + i).classList.add('dragon');
    }
    if (type == 'ice') {
        document.getElementById('pokemonfortype' + i).classList.add('ice');
    }
    if (type == 'dark') {
        document.getElementById('pokemonfortype' + i).classList.add('dark');
    }
    if (type == 'steel') {
        document.getElementById('pokemonfortype' + i).classList.add('steel');
    }
}


/**
 * load Pokemon
*/
async function loadNextPokemon() {
    await renderNextPokemon();
}


/**
 * make the first letter of the name of the Pokemon upper case
*/
function makeFirstLetterToUpperCase(currentPokemonBeforeUpperCase) {
    return currentPokemonBeforeUpperCase.charAt(0).toUpperCase() + currentPokemonBeforeUpperCase.substring(1);
}


/**
 * template for Pokemon cave
*/
function templateRenderPokemonCaveIfMovesGreaterThanOne(currentPokemonAfterUpperCase, pokemonImage, pokemonFirstMove, pokemonSecondMove, j, i) {
    return `
    <div onclick="showDetails(${i}, ${beforeIndexForOtherAreas})" id="pokemonfortype${i}" class="pokemon-cave">
        <div>
            <div class="name-of-pokemon">${currentPokemonAfterUpperCase}</div>
            <div class="move-style">${pokemonFirstMove}</div>
            <div class="move-style">${pokemonSecondMove}</div>
        </div>
        <div>
            <div class="text-center position-id"><span>#${j}</span></div>
            <div class="img-container-pokemon"><img class="poke-img" src="${pokemonImage}"></div>
        </div>
    </div>`;
}


/*
 * template for Pokemon cave
*/
function templateRenderPokemonCaveIfOnlyOneMove(currentPokemonAfterUpperCase, pokemonImage, pokemonFirstMove, j, i) {
    return `
    <div onclick="showDetails(${i}, ${beforeIndexForOtherAreas})" id="pokemonfortype${i}" class="pokemon-cave">
        <div>
            <div class="name-of-pokemon">${currentPokemonAfterUpperCase}</div>
            <div class="move-style">${pokemonFirstMove}</div>
        </div>
        <div>
            <div class="text-center position-id"><span>#${j}</span></div>
            <div class="img-container-pokemon"><img class="poke-img" src="${pokemonImage}"></div>
        </div>
    </div>`;
}


/**
 * scroll for more Pokemons
 * scrollHeight = das ist die Höhe des gesamten Dokuments
 * innerHeight = ist die Höhe des Fensters
*/
function morePokemonsOnScroll() {
    window.addEventListener('scroll', () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;

        if (inactiveScrollForMorePokemons) {
            if (Math.ceil(scrolled) == scrollable) {
                pokeCounter += 20;
                nextPokemonCounter = nextPokemonCounter + 20;
                loadNextPokemon();
            }
        }
    });
}


/**
 * search Pokemon
*/
function filterPokemon() {
    let searchPokemon = document.getElementById('searchforfilter');
    searchPokemon = searchPokemon.value;
    searchPokemon = searchPokemon.toLowerCase();
    let pokemoncave = document.getElementById('pokemoncave');

    if (searchPokemon == ``) {
        searchPokemon.innerHTML = ``;
        pokemoncave.innerHTML = ``;
        renderPokemon();
        inactiveScrollForMorePokemons = true;
    } else {
        inactiveScrollForMorePokemons = false;
        searchFilter(searchPokemon);
    }
}

async function pushAllPokemonNames() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=1154`;
    let response = await fetch(url);
    let pokemonInfos = await response.json();
    let count = pokemonInfos['count'];

    for (let i = 0; i < count; i++) {
        allPokemonNames.push(pokemonInfos['results'][i]['name']);
    }
}


/**
 * search Filter for else in function filterPokemon
*/
async function searchFilter(searchPokemon) {
    pokemoncave.innerHTML = ``;
    for (let i = 1; i <= allPokemonNames.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let pokemonInfos = await response.json();
        let j = pokemonInfos['id'];
        let pokemonImage = pokemonInfos['sprites']['other']['dream_world']['front_default'];
        let firstLetterForFilterPokemon = pokemonInfos['name'].charAt(0);
        currentPokemonForFilter = pokemonInfos['name'];
        let currentPokemonAfterUpperCaseForFilter = makeFirstLetterToUpperCase(currentPokemonForFilter);
        if (j <= 9) {
            j = '00' + j;
        }
        if (j <= 99 && j >= 10) {
            j = '0' + j;
        }
        if (j >= 100) {
            j;
        }
        if (firstLetterForFilterPokemon.toLowerCase().includes(searchPokemon)) {
            if (pokemonInfos['moves'].length > 1) {
                let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
                let pokemonSecondMove = pokemonInfos['moves'][1]['move']['name'];
                pokemoncave.innerHTML += templateRenderPokemonCaveIfMovesGreaterThanOne(currentPokemonAfterUpperCaseForFilter, pokemonImage, pokemonFirstMove, pokemonSecondMove, j, i);
            } else {
                let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
                pokemoncave.innerHTML += templateRenderPokemonCaveIfOnlyOneMove(currentPokemonAfterUpperCaseForFilter, pokemonImage, pokemonFirstMove, j, i);
            }
            loadBgColorDependOnTypes(pokemonInfos, i);
        }
    }
    searchPokemon.innerHTML = ``;
}


/**
 * show pokemon details
*/
async function showDetails(i) {
    forSlideAndFurtherFunctions = i;
    let showDetailsContainer = document.getElementById('showDetailsContainer');
    showDetailsContainer.classList.add('show-details-container');
    showDetailsContainer.classList.remove('d-none');
    let infoContainerDetails = document.getElementById('infoContainerDetails');
    infoContainerDetails.innerHTML = ``;
    let url = pokemonInfosLimit['results'][i]['url'];
    let response = await fetch(url);
    pokemonShowDetails = await response.json();
    let currentPokemonBeforeUpperCaseShowDetails = pokemonShowDetails['name']
    let currentPokemonAfterUpperCaseShowDetails = makeFirstLetterToUpperCase(currentPokemonBeforeUpperCaseShowDetails);
    let j = pokemonShowDetails['id'];
    if (j <= 9) {
        j = '00' + j;
    }
    if (j <= 99 && j >= 10) {
        j = '0' + j;
    }
    if (j >= 100) {
        j;
    }
    if (pokemonShowDetails['moves'].length > 1) {
        infoContainerDetails.innerHTML = templateShowDetailsTwoMoves(j, currentPokemonAfterUpperCaseShowDetails);
    } if (pokemonShowDetails['moves'].length == 1) {
        infoContainerDetails.innerHTML = templateShowDetailsOneMoves(j, currentPokemonAfterUpperCaseShowDetails);
    } if (pokemonShowDetails['moves'].length < 1) {
        infoContainerDetails.innerHTML = templateShowDetailsNoMoves(j, currentPokemonAfterUpperCaseShowDetails);
    }
    loadBgColorDependOnTypesDetails();
    about();
}


/**
 * make the first letter of the name of the Pokemon upper case
*/
function makeFirstLetterToUpperCase(currentPokemonBeforeUpperCaseShowDetails) {
    return currentPokemonBeforeUpperCaseShowDetails.charAt(0).toUpperCase() + currentPokemonBeforeUpperCaseShowDetails.substring(1);
}


function templateShowDetailsTwoMoves(j, currentPokemonAfterUpperCaseShowDetails) {
    try {
        return `
    <div id="pokedexDetails${beforeIndexForOtherAreas}" id="pokedexDetails" class="pokedex">
        <div>
            <div class="container-back-and-id">
                <div><img onclick="back()" class="back" src="img/close.png"></div>
                <div class="id-in-details"><span>#${j}</span></div>
            </div>
            </div>
                <div class="distance-details">
                <div class="name-details">${currentPokemonAfterUpperCaseShowDetails}</div>
                <div class="moves-detail-container">
                <div class="move-details">${pokemonShowDetails['moves'][0]['move']['name']}</div>
                <div class="move-details">${pokemonShowDetails['moves'][1]['move']['name']}</div>
            </div>
            </div>
                <div class="arrow-details">
                    <img onclick="slideLeft()" class="arrow-left-details" src="img/arrow-left.png">
                    <img onclick="slideRight()" class="arrow-right-details" src="img/arrow-right.png">
                </div>

                <div class="info-container">
                    <div class="pokemon-container-details"><img class="poke-img-showdetails" src="${pokemonShowDetails['sprites']['other']['official-artwork']['front_default']}"></div>
                    <div class="details-area">
                    <div id="about-for-font-weight" onclick="about()" class="font-details-bold color-details-area-titles">About</div>
                    <div id="basestats-for-font-weight" onclick="baseStats()" class="font-details-bold color-details-area-titles">Base Stats</div>
                    <div id="evolution-for-font-weight" onclick="evolution()" class="font-details-bold color-details-area-titles">Evolution</div>
                    <div id="moves-for-font-weight" onclick="moves()" class="font-details-bold color-details-area-titles">Moves</div>
                </div>
                <div class="thin-line"></div>

                <div id="about" class="detailsarea-about">

                </div>

                <div id="baseStats" class="basestats-container">

                <div id="basestatsProgressbar" class="progressbar-basestats-container">

                </div>
                </div>

                <div id="evolution" class="evolution-container">
                                
                </div>

                <div class="moves-container moves-scroll">

                <div id="moves"></div>
                <div></div>

                </div>
        </div>
    </div>`;
    } catch (error) {
        console.log(error);
    }
}


function templateShowDetailsOneMoves(j, currentPokemonAfterUpperCaseShowDetails) {
    try {
        return `
    <div id="pokedexDetails${beforeIndexForOtherAreas}" class="pokedex">
        <div>
            <div class="container-back-and-id">
                <div><img onclick="back()" class="back" src="img/close.png"></div>
                <div class="id-in-details"><span>#${j}</span></div>
            </div>
            </div>
                <div class="distance-details">
                <div class="name-details">${currentPokemonAfterUpperCaseShowDetails}</div>
                <div class="moves-detail-container">
                <div class="move-details">${pokemonShowDetails['moves'][0]['move']['name']}</div>
            </div>
            </div>
                <div class="arrow-details">
                    <img onclick="slideLeft()" class="arrow-left-details" src="img/arrow-left.png">
                    <img onclick="slideRight()" class="arrow-right-details" src="img/arrow-right.png">
                </div>

                <div class="info-container">
                    <div class="pokemon-container-details"><img class="poke-img-showdetails" src="${pokemonShowDetails['sprites']['other']['official-artwork']['front_default']}"></div>
                    <div class="details-area">
                    <div id="about-for-font-weight" onclick="about()" class="color-details-area-titles">About</div>
                    <div id="basestats-for-font-weight" onclick="baseStats()" class="color-details-area-titles">Base Stats</div>
                    <div id="evolution-for-font-weight" onclick="evolution()" class="color-details-area-titles">Evolution</div>
                    <div id="moves-for-font-weight" onclick="moves()" class="color-details-area-titles">Moves</div>
                </div>
                <div class="thin-line"></div>

                <div id="about" class="detailsarea-about">

                </div>

                <div id="baseStats" class="basestats-container">

                </div>

                <div id="evolution" class="evolution-container">
                                
                </div>

                <div class="moves-container" id="moves">

                </div>
        </div>
    </div>`;
    } catch (error) {
        console.log(error);
    }
}



function templateShowDetailsNoMoves(j, currentPokemonAfterUpperCaseShowDetails) {
    try {
        return `
    <div id="pokedexDetails${beforeIndexForOtherAreas}" class="pokedex">
        <div>
            <div class="container-back-and-id">
                <div><img onclick="back()" class="back" src="img/close.png"></div>
                <div class="id-in-details"><span>#${j}</span></div>
            </div>
            </div>
            <div class="distance-details">
                <div class="name-details">${currentPokemonAfterUpperCaseShowDetails}</div>
            </div>
                <div class="arrow-details">
                    <img onclick="slideLeft()" class="arrow-left-details" src="img/arrow-left.png">
                    <img onclick="slideRight()" class="arrow-right-details" src="img/arrow-right.png">
                </div>

                <div class="info-container">
                    <div class="pokemon-container-details"><img class="poke-img-showdetails" src="${pokemonShowDetails['sprites']['other']['official-artwork']['front_default']}"></div>
                    <div class="details-area">
                    <div id="about-for-font-weight" onclick="about()" class="color-details-area-titles">About</div>
                    <div id="basestats-for-font-weight" onclick="baseStats()" class="color-details-area-titles">Base Stats</div>
                    <div id="evolution-for-font-weight" onclick="evolution()" class="color-details-area-titles">Evolution</div>
                    <div id="moves-for-font-weight" onclick="moves()" class="color-details-area-titles">Moves</div>
                </div>
                <div class="thin-line"></div>

                <div id="about" class="detailsarea-about">

                </div>

                <div id="baseStats" class="basestats-container">

                </div>

                <div id="evolution" class="evolution-container">
                                
                </div>

                <div id="moves">

                </div>
        </div>
    </div>`;
    } catch (error) {
        console.log(error);
    }
}


function loadBgColorDependOnTypesDetails() {
    let type = pokemonShowDetails['types'][0]['type']['name'];

    if (type == 'grass') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('grass');
    }
    if (type == 'fire') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('fire');
    }
    if (type == 'water') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('water');
    }
    if (type == 'electric') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('electric');;
    }
    if (type == 'bug') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('bug');
    }
    if (type == 'normal') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('normal');
    }
    if (type == 'poison') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('poison');
    }
    if (type == 'ground') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('ground');
    }
    if (type == 'fairy') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('fairy');
    }
    if (type == 'fighting') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('fighting');
    }
    if (type == 'ghost') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('ghost');
    }
    if (type == 'rock') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('rock');
    }
    if (type == 'psychic') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('psychic');
    }
    if (type == 'dragon') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('dragon');
    }
    if (type == 'ice') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('ice');
    }
    if (type == 'dark') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('dark');
    }
    if (type == 'steel') {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('steel');
    }
}

/**
 * details for pokemon about
*/
async function about() {
    document.getElementById('baseStats').innerHTML = ``;
    document.getElementById('evolution').innerHTML = ``;
    document.getElementById('about').innerHTML = ``;
    document.getElementById('moves').innerHTML = ``;
    document.getElementById('about-for-font-weight').classList.add('font-details-bold');
    document.getElementById('basestats-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('evolution-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('moves-for-font-weight').classList.remove('font-details-bold');
    let about = document.getElementById('about');
    let url = pokemonInfosLimit['results'][forSlideAndFurtherFunctions]['url'];
    let response = await fetch(url);
    pokemonAbout = await response.json();
    let nextUrl = pokemonAbout['species']['url'];
    let nextResponse = await fetch(nextUrl);
    nextPokemonAbout = await nextResponse.json();
    let firstAbility = makeFirstLetterToUpperCase(pokemonAbout['abilities'][0]['ability']['name']);
    let generation = makeFirstLetterToUpperCase(nextPokemonAbout['generation']['name']);
    let eggGroups = makeFirstLetterToUpperCase(nextPokemonAbout['egg_groups'][0]['name']);
    about.innerHTML += templateAbout(firstAbility, generation, eggGroups);
}


function templateAbout(firstAbility, generation, eggGroups) {
    try {
        return `
    <div class="distance-area-about">
        <div class="detailsarea-about-distance">Species</div>
        <div class="detailsarea-about-distance">Height</div>
        <div class="detailsarea-about-distance">Width</div>
        <div class="detailsarea-about-section">Abilities</div>
        <div class="detailsarea-about-breeding">Breeding</div>
        <div class="detailsarea-about-secondpart">Generation</div>
        <div class="detailsarea-about-secondpart">Egg Groups</div>
        <div class="detailsarea-about-secondpart-last">Base Hapiness</div>
    </div>
    <div>
        <div class="detailsarea-about-distance-right">${nextPokemonAbout['genera'][7]['genus']}</div>
        <div class="detailsarea-about-distance-right">${pokemonAbout['height']}</div>
        <div class="detailsarea-about-distance-right">${pokemonAbout['weight']}</div>
        <div class="detailsarea-about-distance-last">${firstAbility}</div>
        <div class="detailsarea-about-secondpart-right">${generation}</div>
        <div class="detailsarea-about-secondpart-right">${eggGroups}</div>
        <div class="detailsarea-about-secondpart-right">${nextPokemonAbout['base_happiness']}</div>
    </div>`;
    }
    catch (error) {
        console.log(error);
    }
}


/**
 * details for pokemon base stats
*/
async function baseStats() {
    document.getElementById('baseStats').innerHTML = ``;
    document.getElementById('about').innerHTML = ``;
    document.getElementById('evolution').innerHTML = ``;
    document.getElementById('moves').innerHTML = ``;
    document.getElementById('basestats-for-font-weight').classList.add('font-details-bold');
    document.getElementById('about-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('evolution-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('moves-for-font-weight').classList.remove('font-details-bold');
    let baseStats = document.getElementById('baseStats');
    let url = pokemonInfosLimit['results'][forSlideAndFurtherFunctions]['url'];
    let response = await fetch(url);
    pokemonBaseStats = await response.json();
    baseStats.innerHTML += templatebaseStats();

    let baseStatsProgressbar = document.getElementById('basestatsProgressbar');
    for (let i = 0; i < pokemonBaseStats['stats'].length; i++) {
        baseStatsProgressbar.innerHTML += templatebaseStatsProgressbar(i);
        let baseStatsprogressbarChild = document.getElementById('basestatsProgressbarWidth' + i);
        baseStatsprogressbarChild.style.width = `${pokemonBaseStats['stats'][i]['base_stat']}%`;

        if(pokemonBaseStats['stats'][i]['base_stat'] > 100) {
            let difference = pokemonBaseStats['stats'][i]['base_stat'] - 100;
            let basestatsProgressbarOverflow = document.getElementById('basestatsProgressbarOverflow' + i);
            basestatsProgressbarOverflow.innerHTML += `<div id="basestatsProgressbarWidthSecond${i}" class="basestats-progressbar-child-second"></div>`
            let basestatsProgressbarOverflowChild = document.getElementById('basestatsProgressbarWidthSecond' + i);
            basestatsProgressbarOverflowChild.style.width =`${difference}%`;
        }
    }
}


function templatebaseStats() {
    try {
        return `
<div>
    <div class="detailsarea-basestats-distance">${pokemonBaseStats['stats'][0]['stat']['name']}</div>
    <div class="detailsarea-basestats-distance">${pokemonBaseStats['stats'][1]['stat']['name']}</div>
    <div class="detailsarea-basestats-distance">${pokemonBaseStats['stats'][2]['stat']['name']}</div>
    <div class="detailsarea-basestats-distance">${pokemonBaseStats['stats'][3]['stat']['name']}</div>
    <div class="detailsarea-basestats-distance">${pokemonBaseStats['stats'][4]['stat']['name']}</div>
    <div class="detailsarea-basestats-distance">${pokemonBaseStats['stats'][5]['stat']['name']}</div>
</div>
<div>
    <div class="detailsarea-basestas-score">${pokemonBaseStats['stats'][0]['base_stat']}</div>
    <div class="detailsarea-basestas-score">${pokemonBaseStats['stats'][1]['base_stat']}</div>
    <div class="detailsarea-basestas-score">${pokemonBaseStats['stats'][2]['base_stat']}</div>
    <div class="detailsarea-basestas-score">${pokemonBaseStats['stats'][3]['base_stat']}</div>
    <div class="detailsarea-basestas-score">${pokemonBaseStats['stats'][4]['base_stat']}</div>
    <div class="detailsarea-basestas-score">${pokemonBaseStats['stats'][5]['base_stat']}</div>
</div>
<div id="basestatsProgressbar" class="progressbar-basestats-container">

</div>`;
    } catch (error) {
        console.log(error);
    }
}


function templatebaseStatsProgressbar(i) {
    return `
    <div id="basestatsProgressbarOverflow${i}" class="basestats-progressbar">
        <div id="basestatsProgressbarWidth${i}" class="basestats-progressbar-child"></div>
    </div>`;
}


/**
 * details for pokemon evolution
*/
async function evolution() {
    document.getElementById('baseStats').innerHTML = ``;
    document.getElementById('about').innerHTML = ``;
    document.getElementById('moves').innerHTML = ``;
    document.getElementById('evolution').innerHTML = ``;
    document.getElementById('evolution-for-font-weight').classList.add('font-details-bold');
    document.getElementById('basestats-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('about-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('moves-for-font-weight').classList.remove('font-details-bold');
    let countforSlideAndFurtherFunctions = forSlideAndFurtherFunctions + 1;
    let urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${countforSlideAndFurtherFunctions}/`;
    let responseSpecies = await fetch(urlSpecies);
    let pokemonSpecies = await responseSpecies.json();
    let url = pokemonSpecies['evolution_chain']['url'];
    let response = await fetch(url);
    let pokemonEvolution = await response.json();
    let firstEvolutionName = pokemonEvolution['chain']['species']['name'];
    let secondEvolutionName = pokemonEvolution['chain']['evolves_to'][0]['species']['name'];
    let thirdEvolutionName = pokemonEvolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
    let firstEvolutionNameUpperCase = makeFirstLetterToUpperCase(firstEvolutionName);
    let secondEvolutionNameUpperCase = makeFirstLetterToUpperCase(secondEvolutionName);
    let thirdEvolutionNameUpperCase = makeFirstLetterToUpperCase(thirdEvolutionName);
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


function evolutionTemplate(firstEvolutionNameUpperCase, secondEvolutionNameUpperCase, thirdEvolutionNameUpperCase) {
    try {
        return `
    <div>
        <img class="img-evolution" src="${firstEvolution['sprites']['other']['official-artwork']['front_default']}">
        <div class="evolution-container-child">${firstEvolutionNameUpperCase}</div>
    </div>
    <div>
        <img class="img-evolution" src="${secondEvolution['sprites']['other']['official-artwork']['front_default']}">
        <div class="evolution-container-child">${secondEvolutionNameUpperCase}</div>
    </div>
    <div>
        <img class="img-evolution" src="${thirdEvolution['sprites']['other']['official-artwork']['front_default']}">
        <div class="evolution-container-child">${thirdEvolutionNameUpperCase}</div>
    </div>`;
    } catch (error) {
        console.log(error);
    }
}


/**
 * details for pokemon evolution
*/
async function moves() {
    document.getElementById('baseStats').innerHTML = ``;
    document.getElementById('evolution').innerHTML = ``;
    document.getElementById('about').innerHTML = ``;
    document.getElementById('moves').innerHTML = ``;
    document.getElementById('moves-for-font-weight').classList.add('font-details-bold');
    document.getElementById('evolution-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('basestats-for-font-weight').classList.remove('font-details-bold');
    document.getElementById('about-for-font-weight').classList.remove('font-details-bold');
    let url = pokemonInfosLimit['results'][forSlideAndFurtherFunctions]['url'];
    let response = await fetch(url);
    pokemonMoves = await response.json();
    let moves = document.getElementById('moves');

    for (let i = 0; i < pokemonMoves['moves'].length; i++) {
        moves.innerHTML += templateMoves(i);
    }
}


function templateMoves(i) {
    try {
        return `
        <div class="moves-detail">${pokemonMoves['moves'][i]['move']['name']}</div>`;
    } catch (error) {
        console.log(error);
    }
}


/**
 * back from details to overview pokemon
*/
function back() {
    let showDetailsContainer = document.getElementById('showDetailsContainer');
    showDetailsContainer.classList.remove('showDetailsContainer');
    showDetailsContainer.classList.add('d-none');
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