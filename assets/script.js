const pokemonImage = document.getElementById("pokemonImage");
const pokemonNameElement = document.getElementById("pokemonName");
const typeElement = document.getElementById("type");
const baseExperienceElement = document.getElementById("baseExperience");
const heightElement = document.getElementById("height");
const weightElement = document.getElementById("weight");
const buttonsContainer = document.getElementById("buttonsContainer");

let currentPokemonId = 1;

// Create buttons
const increaseButton = document.createElement("button");
increaseButton.className = "button-large";
increaseButton.textContent = "+";
increaseButton.id = "increaseButton";

const decreaseButton = document.createElement("button");
decreaseButton.className = "button-large";
decreaseButton.textContent = "-";
decreaseButton.id = "decreaseButton";

const resetButton = document.createElement("button");
resetButton.className = "button-medium";
resetButton.textContent = "RESET";
resetButton.id = "resetButton";

// Append buttons to the buttonsContainer
buttonsContainer.appendChild(decreaseButton);
buttonsContainer.appendChild(resetButton);
buttonsContainer.appendChild(increaseButton);

// Event delegation for buttons
buttonsContainer.addEventListener("click", (event) => {
  const { id } = event.target;
  if (id === "increaseButton") {
    currentPokemonId++;
  } else if (id === "decreaseButton" && currentPokemonId > 1) {
    // Ensure ID doesn't go below 1
    currentPokemonId--;
  } else if (id === "resetButton") {
    currentPokemonId = 1;
  }
  getPokemonImage(currentPokemonId);
  getPokemonStats(currentPokemonId);
});

function getPokemonStats(pokemonId) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then((data) => {
      const type = data.types[0].type.name;
      const baseExperience = data.base_experience;
      const height = formatHeight(data.height);
      const weight = formatWeight(data.weight);

      let emoji = "";
      switch (type) {
        case "water":
          emoji = "💧";
          break;
        case "fire":
          emoji = "🔥";
          break;
        case "grass":
          emoji = "🌿";
          break;
        case "normal":
          emoji = "🌐";
          break;
        case "bug":
          emoji = "🕷";
          break;
        case "poison":
          emoji = "🐍";
          break;
        case "electric":
          emoji = "⚡️";
          break;
        case "ground":
          emoji = "🌏";
          break;
        case "fairy":
          emoji = "🧚";
          break;
        case "fighting":
          emoji = "🥋";
          break;
        case "psychic":
          emoji = "🧠";
          break;
        case "rock":
          emoji = "⛰️";
          break;
        case "ghost":
          emoji = "👻";
          break;
        case "ice":
          emoji = "🧊";
          break;
        case "dragon":
          emoji = "🐉";
          break;
        default:
          emoji = "";
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
  return height < 10 ? `${height * 10} cm` : `${(height / 10).toFixed(1)} m`;
}

function formatWeight(weight) {
  return weight < 10 ? `${weight * 10} g` : `${(weight / 10).toFixed(1)} kg`;
}
// Load initial Pokemon data when the page loads
document.addEventListener("DOMContentLoaded", () => {
  getPokemonImage(currentPokemonId);
  getPokemonStats(currentPokemonId);
});
