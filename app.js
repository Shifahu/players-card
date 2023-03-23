
const eventListener =(element) => {
    console.log(element, "element")
    element.addEventListener('change', console.log('rendering stats'));
    // function to render the stats
        // event.preventDefault();
        
}
function loadPlayers() {
    fetch('./player-stats.json')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('players-names');
            // console.log(select, "select");
            
            data.players.forEach(player => {
                // access the player name via player.name.first + player.name.last
                const firstName = player.player.name.first;
                const lastName = player.player.name.last;
                // create the child element tag option for the dropdown
                const option = document.createElement('option');
                option.value = firstName;
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

