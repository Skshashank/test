const express = require('express');
const path = require('path');
const cors = require("cors");

const configDB = require('./server/DB/configDB.js');
configDB();


const app = express();
app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home/Home.html'));
});
app.get('/quote', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quotePage/quote.html'));
});
app.get('/fav', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Fav/Favourites.html'));
});
app.use('/api/fav', require('./server/Routes/route.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started port ${PORT}`));