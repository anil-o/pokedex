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
let isLoading = false;
let firstAbility;
let generation;
let eggGroups;
let species;
let height;
let weight;
let basehappiness;
let firstEvolutionNameUpperCase;
let secondEvolutionNameUpperCase;
let thirdEvolutionNameUpperCase;
let move;
let alreadyEmpty = true;
let renderPokemonAfterFinishLoadPokemon = true;


/**
 * functions for initialization
*/
async function init() {
    await loadPokemon();
    await morePokemonsOnScroll();
    await pushAllPokemonNames();
}


/**
 * load pokemon
*/
async function loadPokemon() {
    await renderPokemon();
}



/**
 * render pokemon cave
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
            await getInformationOfThePokemon(i);
        }
    }
}

/**
 * render next pokemon cave
*/
async function renderNextPokemon() {
    renderPokemonAfterFinishLoadPokemon = false;
    isLoading = true;
    for (let i = nextPokemonCounter; i < pokeCounter; i++) {
        if (pokemonInfosLimit['results'][i]['url'] == ``) {
            continue;
        } else {
            await getInformationOfThePokemon(i);
        }
    }
    isLoading = false;
    renderPokemonAfterFinishLoadPokemon = true;
}


async function getInformationOfThePokemon(i) {
    let pokemonImage;
    let url = pokemonInfosLimit['results'][i]['url'];
    let response = await fetch(url);
    let pokemonInfos = await response.json();
    let j = pokemonInfos['id'];
    beforeIndexForOtherAreas = j;
    let currentPokemonBeforeUpperCase = pokemonInfos['name'];
    let currentPokemonAfterUpperCase = makeFirstLetterToUpperCase(currentPokemonBeforeUpperCase);
    if (pokemonInfos['sprites']['other']['dream_world']['front_default'] !== null) {
        pokemonImage = pokemonInfos['sprites']['other']['dream_world']['front_default'];
    } if (pokemonInfos['sprites']['other']['official-artwork']['front_default'] !== null) {
        pokemonImage = pokemonInfos['sprites']['other']['official-artwork']['front_default'];
    } else {
        pokemonImage = pokemonInfos['sprites']['front_default'];
    }
    identifyIdOfThePokemonAndMoves(pokemonInfos, currentPokemonAfterUpperCase, pokemonImage, i, j);
    loadBgColorDependOnTypes(pokemonInfos, i);
}


function identifyIdOfThePokemonAndMoves(pokemonInfos, currentPokemonAfterUpperCase, pokemonImage, i, j) {
    if (j <= 9) { j = '00' + j; }
    if (j <= 99 && j >= 10) { j = '0' + j; }
    if (j >= 100) { j; }
    if (pokemonInfos['moves'].length <= 0) {
        let noMove = `<div>this value does not exist for this pokemon</div>`;
        pokemoncave.innerHTML += templateRenderPokemonCaveIfOnlyOneMove(currentPokemonAfterUpperCase, pokemonImage, noMove, j, i);
    } else {
        if (pokemonInfos['moves'].length > 1) {
            let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
            let pokemonSecondMove = pokemonInfos['moves'][1]['move']['name'];
            pokemoncave.innerHTML += templateRenderPokemonCaveIfMovesGreaterThanOne(currentPokemonAfterUpperCase, pokemonImage, pokemonFirstMove, pokemonSecondMove, j, i);
        } else {
            let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
            pokemoncave.innerHTML += templateRenderPokemonCaveIfOnlyOneMove(currentPokemonAfterUpperCase, pokemonImage, pokemonFirstMove, j, i);
        }
    }
}


/**
 * render the background color of the pokemon
*/
function loadBgColorDependOnTypes(pokemonInfos, i) {
    if (!pokemonInfos['types'][0]['type']['name']) {
        document.getElementById('pokemonfortype' + i).classList.add('bgcolor');
    } else {
        let type = pokemonInfos['types'][0]['type']['name'];
        document.getElementById('pokemonfortype' + i).classList.add(type);
    }
}


/**
 * load Pokemon
*/
async function loadNextPokemon() {
    if (isLoading == false) {
        await renderNextPokemon();
    }
}


/**
 * make the first letter of the name of the Pokemon upper case
*/
function makeFirstLetterToUpperCase(currentPokemonBeforeUpperCase) {
    return currentPokemonBeforeUpperCase.charAt(0).toUpperCase() + currentPokemonBeforeUpperCase.substring(1);
}


/**
 * scroll for more Pokemons
 * scrollHeight = das ist die Höhe des gesamten Dokuments
 * innerHeight = ist die Höhe des Fensters
*/
async function morePokemonsOnScroll() {
    if (renderPokemonAfterFinishLoadPokemon) {
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
}


/**
 * load pokemons after search filter
*/
async function loadPokemonInfos(currentPokemon, i) {
    let pokemonImage;
    let currentPokemonAfterUpperCaseForFilter = makeFirstLetterToUpperCase(currentPokemon);
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemon}/`;
    let response = await fetch(url);
    let pokemonInfos = await response.json();
    let j = pokemonInfos['id'];
    if (pokemonInfos['sprites']['other']['dream_world']['front_default'] !== null) {
        pokemonImage = pokemonInfos['sprites']['other']['dream_world']['front_default'];
    } else {
        if (pokemonInfos['sprites']['other']['official-artwork']['front_default'] !== null) {
            pokemonImage = pokemonInfos['sprites']['other']['official-artwork']['front_default'];
        } else {
            pokemonImage = pokemonInfos['sprites']['front_default'];
        }
    }
    currentPokemonForFilter = pokemonInfos['name'];
    getIdAndMovesOfThePokemonForSearchFilter(j, i, pokemonImage, currentPokemonAfterUpperCaseForFilter, pokemonInfos);
}


/**
 * render pokemons after search filter
*/
function getIdAndMovesOfThePokemonForSearchFilter(j, i, pokemonImage, currentPokemonAfterUpperCaseForFilter, pokemonInfos) {
    if (j <= 9) { j = '00' + j; }
    if (j <= 99 && j >= 10) { j = '0' + j; }
    if (j >= 100) { j; }
    if (pokemonInfos['moves'].length <= 0) {
        let pokemonFirstMove = '';
        templateRenderPokemonCaveIfOnlyOneMove(currentPokemonAfterUpperCaseForFilter, pokemonImage, pokemonFirstMove, j, i);
    } else {
        if (pokemonInfos['moves'].length > 1) {
            let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
            let pokemonSecondMove = pokemonInfos['moves'][1]['move']['name'];
            pokemoncave.innerHTML += templateRenderPokemonCaveIfMovesGreaterThanOne(currentPokemonAfterUpperCaseForFilter, pokemonImage, pokemonFirstMove, pokemonSecondMove, j, i);
        } else {
            let pokemonFirstMove = pokemonInfos['moves'][0]['move']['name'];
            pokemoncave.innerHTML += templateRenderPokemonCaveIfOnlyOneMove(currentPokemonAfterUpperCaseForFilter, pokemonImage, pokemonFirstMove, j, i);
        }
    }
    loadBgColorDependOnTypes(pokemonInfos, i);
}


/**
 * push all pokemon names in array
*/
async function pushAllPokemonNames() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=1154`;
    let response = await fetch(url);
    let pokemonInfos = await response.json();
    let count = pokemonInfos['count'];
    for (let i = 0; i < count; i++) {
        if (pokemonInfos['results'][i]['name'] == '') {
            continue;
        } else {
            allPokemonNames.push(pokemonInfos['results'][i]['name']);
        }
    }
}

/**
 * show pokemon details
*/
async function showDetails(i) {
    let bodyContainer = document.getElementById('bodyContainer');
    bodyContainer.style = "overflow: hidden;";
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
    getIdAndMovesOfThePokemonForShowDetails(j, currentPokemonAfterUpperCaseShowDetails);
    loadBgColorDependOnTypesDetails();
    about();
}


function getIdAndMovesOfThePokemonForShowDetails(j, currentPokemonAfterUpperCaseShowDetails) {
    if (j <= 9) { j = '00' + j; }
    if (j <= 99 && j >= 10) { j = '0' + j; }
    if (j >= 100) { j; }
    if (pokemonShowDetails['moves'].length > 1) {
        infoContainerDetails.innerHTML = templateShowDetailsTwoMoves(j, currentPokemonAfterUpperCaseShowDetails);
    } if (pokemonShowDetails['moves'].length == 1) {
        infoContainerDetails.innerHTML = templateShowDetailsOneMoves(j, currentPokemonAfterUpperCaseShowDetails);
    } if (pokemonShowDetails['moves'].length < 1) {
        infoContainerDetails.innerHTML = templateShowDetailsNoMoves(j, currentPokemonAfterUpperCaseShowDetails);
    }
}



/**
 * make the first letter of the name of the Pokemon upper case
*/
function makeFirstLetterToUpperCase(currentPokemonBeforeUpperCaseShowDetails) {
    return currentPokemonBeforeUpperCaseShowDetails.charAt(0).toUpperCase() + currentPokemonBeforeUpperCaseShowDetails.substring(1);
}


function loadBgColorDependOnTypesDetails() {
    if(!pokemonShowDetails['types'][0]['type']['name']) {
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add('bgcolor');
    } else {
        let type = pokemonShowDetails['types'][0]['type']['name'];
        document.getElementById('pokedexDetails' + beforeIndexForOtherAreas).classList.add(type);
    }
}

/**
 * search Pokemon
*/
async function filterPokemon() {
    let searchPokemon = document.getElementById('searchforfilter');
    let searchPokemonForEmpty = searchPokemon.value.toLowerCase();
    if (searchPokemonForEmpty == '' && alreadyEmpty == true) {
        inactiveScrollForMorePokemons = true;
        alreadyEmpty = false;
        await renderPokemonAfterSearchFilter();
    }
    if (searchPokemonForEmpty != '') {
        inactiveScrollForMorePokemons = false;
        alreadyEmpty = true;
        await searchFilter(searchPokemon, searchPokemonForEmpty);
    }
}


/**
 * search filter pokemon
*/
async function searchFilter(searchPokemon, searchPokemonForEmpty) {
    pokemoncave.innerHTML = ``;
    for (let i = 1; i <= allPokemonNames.length; i++) {
        let j = i - 1;
        let currentPokemon = allPokemonNames[j];
        if (searchPokemon.value == '') {
            inactiveScrollForMorePokemons = true;
            alreadyEmpty = false;
            i = allPokemonNames.length;
            await renderPokemonAfterSearchFilter();
        }
        if (searchPokemon.value != searchPokemonForEmpty) {
            i = allPokemonNames.length;
        } else {
            if (currentPokemon.toLowerCase().includes(searchPokemon.value.toLowerCase())) {
                await loadPokemonInfos(currentPokemon, j);
            }
        }
    }
}

/**
 * render next pokemon cave
*/
async function renderPokemonAfterSearchFilter() {
    let pokemoncave = document.getElementById('pokemoncave');
    pokemoncave.innerHTML = ``;
    for (let i = 0; i < 20; i++) {
        await getInformationOfThePokemon(i);
    }
}