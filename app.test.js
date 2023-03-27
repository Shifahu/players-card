 const {
    getPlayerStats,
    getPlayerImg,
    calculatePlayerStats,
    playersPosition,
    changePlayer,
    eventListener,
    loadPlayers,
  } = require('./app.js');

  describe("getPlayerStats", () => {
    test("displays the correct stats for the selected player", () => {
      // Set up the DOM element
      document.body.innerHTML = `
        <div>
          <p data-id="appearances"></p>
          <p data-id="goals"></p>
          <p data-id="goal_assist"></p>
          <p data-id="goals-per-match"></p>
          <p data-id="passes-per-minute"></p>
        </div>
      `;
  
      // Call the getPlayerStats function with the provided player object
      const player = {
        "player": {
          "info": {
            "position": "M",
            "shirtNum": 42,
            "positionInfo": "Centre Defensive Midfielder"
          },
          "nationalTeam": {
            "isoCode": "CI",
            "country": "Cote D'Ivoire",
            "demonym": "Ivorian"
          },
          "age": "33 years 67 days",
          "name": {
            "first": "Yaya",
            "last": "Touré"
          },
          "id": 4148,
          "currentTeam": {
            "name": "Manchester City",
            "teamType": "FIRST",
            "shortName": "Man City",
            "id": 11
          }
        },
        "stats": [
          {
            "name": "goals",
            "value": 65
          },
          {
            "name": "losses",
            "value": 49
          },
          {
            "name": "wins",
            "value": 149
          },
          {
            "name": "draws",
            "value": 35
          },
          {
            "name": "fwd_pass",
            "value": 4491
          },
          {
            "name": "goal_assist",
            "value": 35
          },
          {
            "name": "appearances",
            "value": 232
          },
          {
            "name": "mins_played",
            "value": 18919
          },
          {
            "name": "backward_pass",
            "value": 1995
          }
        ]
      };
      getPlayerStats(player);
  
      // Check that the DOM elements have been updated with the correct stats
      expect(document.querySelector('[data-id="appearances"]').innerText).toBe("232");
      expect(document.querySelector('[data-id="goals"]').innerText).toBe("65");
      expect(document.querySelector('[data-id="goal_assist"]').innerText).toBe("35");
      expect(document.querySelector('[data-id="goals-per-match"]').innerText).toBe("");
      expect(document.querySelector('[data-id="passes-per-minute"]').innerText).toBe("");
    });
  });

  describe('calculatePlayerStats', () => {
    it('should calculate goals-per-match and passes-per-minute correctly', () => {
      const selectedPlayer = {
        "player": {
          "info": {
            "position": "M",
            "shirtNum": 42,
            "positionInfo": "Centre Defensive Midfielder"
          },
          "nationalTeam": {
            "isoCode": "CI",
            "country": "Cote D'Ivoire",
            "demonym": "Ivorian"
          },
          "age": "33 years 67 days",
          "name": {
            "first": "Yaya",
            "last": "Touré"
          },
          "id": 4148,
          "currentTeam": {
            "name": "Manchester City",
            "teamType": "FIRST",
            "shortName": "Man City",
            "id": 11
          }
        },
        "stats": [
          {
            "name": "goals",
            "value": 65
          },
          {
            "name": "losses",
            "value": 49
          },
          {
            "name": "wins",
            "value": 149
          },
          {
            "name": "draws",
            "value": 35
          },
          {
            "name": "fwd_pass",
            "value": 4491
          },
          {
            "name": "goal_assist",
            "value": 35
          },
          {
            "name": "appearances",
            "value": 232
          },
          {
            "name": "mins_played",
            "value": 18919
          },
          {
            "name": "backward_pass",
            "value": 1995
          }
        ]
      };
  
      calculatePlayerStats(selectedPlayer);
  
      expect(selectedPlayer.stats).toEqual(
        expect.arrayContaining([
          { name: 'goals-per-match', value: '0.28' },
          { name: 'passes-per-minute', value: '0.41' }
        ])
      );
    });
  });
  
  const { playersPosition } = require('./your-module');

describe('playersPosition', () => {
  const selectedPlayer = {
      "player": {
        "info": {
          "position": "M",
          "shirtNum": 42,
          "positionInfo": "Centre Defensive Midfielder"
        },
        "nationalTeam": {
          "isoCode": "CI",
          "country": "Cote D'Ivoire",
          "demonym": "Ivorian"
        },
        "age": "33 years 67 days",
        "name": {
          "first": "Yaya",
          "last": "Touré"
        },
        "id": 4148,
        "currentTeam": {
          "name": "Manchester City",
          "teamType": "FIRST",
          "shortName": "Man City",
          "id": 11
        }
      },
      "stats": [
        {
          "name": "goals",
          "value": 65
        },
        {
          "name": "losses",
          "value": 49
        },
        {
          "name": "wins",
          "value": 149
        },
        {
          "name": "draws",
          "value": 35
        },
        {
          "name": "fwd_pass",
          "value": 4491
        },
        {
          "name": "goal_assist",
          "value": 35
        },
        {
          "name": "appearances",
          "value": 232
        },
        {
          "name": "mins_played",
          "value": 18919
        },
        {
          "name": "backward_pass",
          "value": 1995
        }
      ]
    };

  it('returns the correct lastPosition value', () => {
    const lastPosition = playersPosition(selectedPlayer);
    expect(lastPosition).toBe('Midfielder');
  });
});

// Import getPlayerImg function
import { getPlayerImg } from './getPlayerImg';

describe('getPlayerImg', () => {
  it('sets the img.src and img.alt variables correctly', () => {
    // Arrange
    const selectedPlayerId = 4148;
    const fullName = 'Yaya Touré';
    const img = { src: '', alt: '' };
    jest.spyOn(document, 'getElementById').mockReturnValue(img);

    // Act
    getPlayerImg(selectedPlayerId, fullName);

    // Assert
    expect(img.src).toEqual(`./assets/p${selectedPlayerId}.png`);
    expect(img.alt).toEqual(`Image of ${fullName}`);

    // Restore the document.getElementById method
    document.getElementById.mockRestore();
  });
});


  

 

