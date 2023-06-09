// declaring the data fetched from the JSON so it's globally available
let data;

//this checks the players stats and adds it to the corresponding HTML element
//for extensibility, add the new stat to the arrOfstats obj and add an extra html element in the html file.
const getPlayerStats = (selectedPlayer) => {
  let arrOfstats = [
    "appearances",
    "goals",
    "goal_assist",
    "goals-per-match",
    "passes-per-minute",
  ];
  arrOfstats.forEach((stat) => {
    const detail = selectedPlayer.stats.find(
      (detail) => detail.name === stat
    );
    if (!detail) {
      selectedPlayer.stats.push({ name: stat, value: "" });
    }
    const value = detail ? detail.value : "";

    const selectedElement = document.querySelector(`[data-id="${stat}"]`);
    selectedElement.innerText = value;
  });
};


// renders the correct players image using the players ID and uses full name for the alt tag(accessibility purposes)
const getPlayerImg = (selectedPlayerId, fullName) => {
  const img = document.getElementById("playerImg");
  img.src = `./assets/p${selectedPlayerId}.png`;
  img.alt = `Image of ${fullName}`;
};

//calculates the players goals per match stat and passes per minute
const calculatePlayerStats = (selectedPlayer) => {
  console.log(selectedPlayer, "selectedPlayer")
  const goals = selectedPlayer.stats.find(
    (stat) => stat.name === "goals"
  ).value;
  const appearances = selectedPlayer.stats.find(
    (stat) => stat.name === "appearances"
  ).value;
  const goalsPerMatch = (goals / appearances).toFixed(2);
  const fwd_pass = selectedPlayer.stats.find(
    (stat) => stat.name === "fwd_pass"
  ).value;
  const backward_pass = selectedPlayer.stats.find(
    (stat) => stat.name === "backward_pass"
  ).value;
  const mins_played = selectedPlayer.stats.find(
    (stat) => stat.name === "mins_played"
  ).value;
  const passesPerMin = ((fwd_pass + backward_pass) / mins_played).toFixed(2);

  selectedPlayer.stats.push({ name: "goals-per-match", value: goalsPerMatch });
  selectedPlayer.stats.push({ name: "passes-per-minute", value: passesPerMin });
};

// returns the position played
const playersPosition = (selectedPlayer) => {
  const position = selectedPlayer.player.info.positionInfo;
  const lastPosition = position.split(" ").pop().trim();
  const positionDiv = document.getElementById("position");
  positionDiv.innerHTML = lastPosition;
};

//this function renders the players details on to the page
const changePlayer = () => {
  const selectedPlayerId = Number(
    document.getElementById("players-names").value
  );
  const selectedPlayer = data.players.find(
    (player) => player.player.id === selectedPlayerId
  );
  calculatePlayerStats(selectedPlayer);
  playersPosition(selectedPlayer);
  const statsDiv = document.getElementById("fullName");
  const fullName = `${selectedPlayer.player.name.first} ${selectedPlayer.player.name.last}`;
  getPlayerImg(selectedPlayerId, fullName);
  statsDiv.innerHTML = fullName;

  getPlayerStats(selectedPlayer);
};

const eventListener = (element) => {
  element.addEventListener("change", changePlayer);
};

//On load this gets the data from the json and populates the dropdown with the players names
const loadPlayers = () => {
  fetch("./player-stats.json")
    .then((response) => response.json())
    .then((responseData) => {
      data = responseData;
      const select = document.getElementById("players-names");
      data.players.forEach((player) => {
        const playerID = player.player.id;
        const { first, last } = player.player.name
        const option = document.createElement("option");
        option.value = playerID;
        option.text = `${first} ${last}`;
        select.appendChild(option);
      });
      eventListener(select);
    })
    .catch((error) => {
      console.error(error);
      errorModal();
    });
};

loadPlayers();


const errorModal = () => {
  const modal = document.createElement("div");
  modal.classList = "error-modal"
  modal.innerHTML = "Your request cannot be processed at the moment, please try again later "
}


module.exports = {
  getPlayerStats,
  getPlayerImg,
  calculatePlayerStats,
  playersPosition,
  changePlayer,
  eventListener,
  loadPlayers,
};


 