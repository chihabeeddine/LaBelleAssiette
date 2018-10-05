const express        = require('express');
const bodyParser     = require('body-parser');


const dbConfig      = require('./config/database');
const mongoose      = require('mongoose');

const app           = express();
mongoose.Promise    = global.Promise;


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({"message": "Welcome to the application. you can add, get, edit and delete ingredients in the inventory"});
});

require('./app/routes/inventory.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

/**
 * Connecting to the database
 */
mongoose.connect(dbConfig.mongoURI[app.settings.env], {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database " + dbConfig.mongoURI[app.settings.env]);
}).catch(err => {
    console.log('Could not connect to the database. Exiting now... ' + err);
    process.exit();
});

module.exports = app;