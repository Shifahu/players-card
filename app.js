let data;

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
    ).value;
    const selectedElement = document.querySelector(`[data-id="${stat}"]`);
    selectedElement.innerText = detail;
  });
};

const getPlayerImg = (selectedPlayerId, fullName) => {
  const img = document.getElementById("playerImg");
  img.src = `./assets/p${selectedPlayerId}.png`;
  img.alt = `Image of ${fullName}`;
};

const calculatePlayerStats = (selectedPlayer) => {
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

const playersPosition = (selectedPlayer) => {
  const position = selectedPlayer.player.info.positionInfo;
  const lastPosition = position.split(" ").pop().trim();
  const positionDiv = document.getElementById("position");
  positionDiv.innerHTML = lastPosition;
};

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

