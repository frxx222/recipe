const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true}));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);

app.use((req, res, next) => {
    const errror = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



app.listen(port, () =>
  console.log(`Listening on http://localhost:${port}...`)
);