const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// set EJS for templating engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true})); 

// serve static files
app.use(express.static('public'));

// home route
app.get('/', (req, res) => {
    res.render('index');
});

// post route for JokeAPI to submit name
app.post('/get-joke', async (req, res) => {
    // extract 'firstName' and 'lastName' from form
    const { firstName, lastName } = req.body;

    try {
        // use axios to make GET request to the JokeAPI with the provided data.
        const jokeResponse = await axios.get(`https://v2.jokeapi.dev/joke/Programming?firstName=${firstName}&lastName=${lastName}`);

        // extract the joke data from the response object.
        const jokeData = jokeResponse.data;

        // render 'index' template with the joke data.
        res.render('index', { joke: jokeData.joke || jokeData.setup + " " + jokeData.delivery });

    } catch (error) {
        // if the API request fails, render 'index' template with error message
        res.render('index', { joke: 'Whoops... Could not fetch a joke. Try again.' });
    }
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});