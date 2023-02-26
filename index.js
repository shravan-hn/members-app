const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger')
const app = express()
const members = require('./Members');

//init middle ware
// app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Home page route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members api routes
app.use('/api/members', require('./routes/api/members'))
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));