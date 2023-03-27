Players Card Web Component

This app is a web component that renders football player stats.

Getting Started

To get started, clone the repository and enter the following commands in the CLI:


npm i    // install the http server

npm start    // run the server

Navigate to http://127.0.0.1:8080 in your browser.

Technologies Used

Vanilla JavaScript
HTML

SASS (CSS)

Jest (JavaScript testing framework)

Extensions used:

Live SASS compiler to convert SASS to CSS

axe Google Chrome extension to assess accessibility - https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd

Development Process

I started by creating the component template in the HTML file and using DOM manipulation to render the necessary values required in the app.js file. I then imported the JSON files into the app.js file using a http server to do a fetch request to the JSON file.

In the loadPlayer() function, it populates the dropdown with options of each player. When a player is selected, an event listener executes the changePlayer function which populates the component card in the HTML. The HTML is prepopulated in the same way the mockup shows. There is also an error block in loadPlayers() that renders a modal if the fetch request fails, which prompts the user to try again later.

In changePlayer(), the function accesses each player's details when they are selected and applies necessary manipulations (e.g., creating custom player stats via calculatePlayerStats(), getting the player's position in playersPosition(), and rendering the corresponding player's image in getPlayersImg()).

Design-wise, I stuck to a simple and clean design, attempting to copy the example given. In the future, I could add some simple transition animations to when each player was selected from the dropdown. I would also style the error modal a bit more so that it was more fitting to the design spec.

Testing

I did a mini QA testing, but testing the app renders and work across all four browsers, Safari, Google Chrome, Microsoft Edge and Firefox. I also ensured that they behaved and looked as expected across different screensizes, as I developed the app mobile first.

The Jest tests written did not seem to run. With more time, I would investigate why these unit tests were not working. I would also write snapshot tests by taking a snapshot of the rendered output of the card component and comparing it to a previously stored snapshot. This helps to ensure that the component is rendered correctly over time. To test that the dropdown is populated correctly, I would take a snapshot of the dropdown component after it has been populated with options and compare it to the previously stored snapshot. To test that the image has rendered correctly, I would check that the src and alt attributes of the img element are correct. To test stats that have been properly rendered, I would take a snapshot of the component after the stats have been rendered and compare it to the previously stored snapshot.

Gulp

With more time, I would have included Gulp at the beginning of production, which would have compiled the SASS to CSS, minified JavaScript files, and reloaded the browser automatically during development. Although I am not familiar with the tool, I would have spent some time understanding how it is used to incorporate it into the production of the app.
