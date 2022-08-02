const page = document.querySelector('#pokedex-page')

const colorTypes = {
  grass: 'success',
  bug: 'success',
  fire: 'danger',
  fighting: 'danger',
  dragon: 'danger',
  water: 'primary',
  psychic: 'primary',
  poison: 'secondary',
  rock: 'dark',
  ground: 'warning',
  electric: 'warning',
  ice: 'info',
  ghost: 'info',
  fairy: 'light',
  normal: 'light'
}

const colorBg = {
  grass: 'HoneyDew',
  bug: 'Linen',
  fire: 'PeachPuff',
  fighting: 'pink',
  dragon: 'MistyRose',
  water: 'AliceBlue',
  psychic: 'LightSteelBlue',
  poison: 'thistle',
  rock: 'lightgray',
  ground: 'Wheat',
  electric: 'lightyellow',
  ice: 'WhiteSmoke',
  ghost: 'GhostWhite',
  fairy: 'LavenderBlush',
  normal: 'light'
}

fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
  .then(response => {
    return response.json()
  })
  .then(async data => {
    const box = document.querySelector('#pokemon-box')
    page.innerHTML = ''

    for (const element of data.results) {
      box.querySelector('#pokemon-name').innerHTML = element.name
      box.querySelector('#pokemon-name').style.textTransform = 'capitalize'

      const pokemonImage = await fetch('https://pokeapi.co/api/v2/pokemon-form/' + element.name)
      const img = await pokemonImage.json()
      box.querySelector('#pokemon-img').src = img.sprites.front_default

      const pokemonType = await fetch('https://pokeapi.co/api/v2/pokemon-form/' + element.name)
      const pkType = await pokemonType.json()
      const boxType = box.querySelector('#pokemon-type')
      boxType.classList = `btn btn-${colorTypes[pkType.types[0].type.name]}`
      boxType.innerHTML = pkType.types[0].type.name
      boxType.style.textTransform = 'capitalize'

      box.querySelector('.card').style.backgroundColor = colorBg[pkType.types[0].type.name]

      page.innerHTML += box.outerHTML
    }
    console.log('https://pokeapi.co/api/v2/pokemon-form/' + data.results[26].name)
  })
