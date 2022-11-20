const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./src/config/corsOptions');
const credentials = require('./src/middleware/credentials');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));

app.use('/movie', require('./src/routes/movie'));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'src/views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
