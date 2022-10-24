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

                <div id="movesContainer" class="moves-container">

                <div id="moves"></div>

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


function templateAbout(firstAbility, generation, eggGroups, species, height, weight, basehappiness) {
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
        <div class="detailsarea-about-distance-right">${species}</div>
        <div class="detailsarea-about-distance-right">${height}</div>
        <div class="detailsarea-about-distance-right">${weight}</div>
        <div class="detailsarea-about-distance-last">${firstAbility}</div>
        <div class="detailsarea-about-secondpart-right">${generation}</div>
        <div class="detailsarea-about-secondpart-right">${eggGroups}</div>
        <div class="detailsarea-about-secondpart-right">${basehappiness}</div>
    </div>`;
    }
    catch (error) {
        console.log(error);
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


function templateForNoEvolution() {
        return `
        <div class="evolution-if-no-exist">this value does not exist for this pokemon</div>`;
}


function templateMoves(move) {
    try {
        return `
        <div id="movesDetail" class="moves-detail">${move}</div>`;
    } catch (error) {
        console.log(error);
    }
}
