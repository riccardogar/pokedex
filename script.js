const pokemonImage = document.getElementById("pokemonImage");
const decreaseButton = document.getElementById("decreaseButton");
const resetButton = document.getElementById("resetButton");
const nextButton = document.getElementById("increaseButton");
const pokemonNameElement = document.getElementById("pokemonName");

const typeElement = document.getElementById("type");
const baseExperienceElement = document.getElementById("baseExperience");
const heightElement = document.getElementById("height");
const weightElement = document.getElementById("weight");

let currentPokemonId = 1;

function getPokemonStats(pokemonId) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then((data) => {
      const type = data.types[0].type.name;
      const baseExperience = data.base_experience;
      const height = formatHeight(data.height);
      const weight = formatWeight(data.weight);

      let emoji = "";

      if (type === "water") {
        emoji = "💧";
      } else if (type === "fire") {
        emoji = "🔥";
      } else if (type === "grass") {
        emoji = "🌿";
      } else if (type === "normal") {
        emoji = "🌐";
      } else if (type === "bug") {
        emoji = "🕷";
      } else if (type === "poison") {
        emoji = "🐍";
      } else if (type === "electric") {
        emoji = "⚡️";
      } else if (type === "ground") {
        emoji = "🌏";
      } else if (type === "fairy") {
        emoji = "🧚";
      } else if (type === "fighting") {
        emoji = "🥋";
      } else if (type === "psychic") {
        emoji = "🧠";
      } else if (type === "rock") {
        emoji = "⛰️";
      } else if (type === "ghost") {
        emoji = "👻";
      } else if (type === "ice") {
        emoji = "🧊";
      } else if (type === "dragon") {
        emoji = "🐉";
      }

      typeElement.textContent = `${emoji} Type: ${
        type.charAt(0).toUpperCase() + type.slice(1)
      }`;
      baseExperienceElement.textContent = `⭐️ Base Experience: ${baseExperience}`;
      heightElement.textContent = `📐 Height: ${height}`;
      weightElement.textContent = `⚖️ Weight: ${weight}`;
    })
    .catch((error) => console.error(error));
}

getPokemonImage(currentPokemonId);

getPokemonStats(currentPokemonId);

function getPokemonImage(pokemonId) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.sprites.front_default;
      pokemonImage.src = imageUrl;
      const name = data.name;
      pokemonNameElement.textContent = `#${pokemonId} : ${
        name.charAt(0).toUpperCase() + name.slice(1)
      }`;
    })
    .catch((error) => console.error(error));
}

function formatHeight(height) {
  if (height < 10) {
    return `${height * 10} cm`;
  } else {
    return `${(height / 10).toFixed(1)} m`;
  }
}

function formatWeight(weight) {
  if (weight < 10) {
    return `${weight * 10} g`;
  } else {
    return `${(weight / 10).toFixed(1)} kg`;
  }
}

nextButton.addEventListener("click", () => {
  currentPokemonId++;
  getPokemonImage(currentPokemonId);
  getPokemonStats(currentPokemonId);
});

decreaseButton.addEventListener("click", () => {
  currentPokemonId--;
  getPokemonImage(currentPokemonId);
  getPokemonStats(currentPokemonId);
});

resetButton.addEventListener("click", () => {
  currentPokemonId = 1;
  getPokemonImage(currentPokemonId);
  getPokemonStats(currentPokemonId);
});
