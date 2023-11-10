// Importing express.
const express = require('express');

// Adding path to join directories and create different file paths.
const path = require('path');

// Route to Notes file.
const api = require('./routes/noteRoutes');

//
const app = express();

// Setting PORT allows us to go to Heroku.
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', api);

//Route to notes page.
app.get('/notes',(req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// Route to homepage.
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Listener
app.listen(PORT, () => {
    console.log(`Serving static asset routes at http://localhost:${PORT}`);
});