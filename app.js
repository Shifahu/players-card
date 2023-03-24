let data;

const getPlayerStats = (selectedPlayer) => {
    let arrOfstats = ['appearances','goals','goal_assist']
    arrOfstats.forEach(stat =>{
    const detail =  selectedPlayer.stats.find(detail => detail.name === stat).value
    console.log(detail, "detail")
    const selectedElement = document.querySelector(`[data-id=$"{stat}"]`)
    selectedElement.innerText = detail
})

}
const changePlayer = () => {
    //this function will render all the changes needed for the application
    console.log('changePlayer')
    const selectedPlayerId = Number(document.getElementById('players-names').value);
    console.log(selectedPlayerId)
    const selectedPlayer = data.players.find(player => player.player.id === selectedPlayerId);
    //helper function  to calculate the players stats!! and append to the selected players stats object
    console.log(selectedPlayer)
    const statsDiv = document.getElementById('stats');
    //players position => make this a function
    // const position = selectedPlayer.player.positionInfo
    // const lastPosition = position.split(' ').pop().trim();
    // console.log(lastPosition, 'lastPosition')
    statsDiv.innerHTML = selectedPlayer.player.name.first;
    // getPlayerStats(selectedPlayer)
    console.log("Player")
}

const eventListener =(element) => {
    element.addEventListener('change', changePlayer);        
}
const loadPlayers = () => {
    fetch('./player-stats.json')
        .then(response => response.json())
        .then(responseData => {
            data = responseData
            const select = document.getElementById('players-names');            
            data.players.forEach(player => {
                // access the player name via player.name.first + player.name.last
                const playerID = player.player.id
                const firstName = player.player.name.first;
                const lastName = player.player.name.last;
                // create the child element tag option for the dropdown
                const option = document.createElement('option');
                option.value = playerID;
                option.text = `${firstName} ${lastName}`;
                // append these children elements to the select-dropdown element
                select.appendChild(option);
                // adding an event listener to the option element  
            }
            )
            eventListener(select);
        })
        .catch(error => {
            console.error(error);
        });
}
loadPlayers();

