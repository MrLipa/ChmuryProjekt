const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./src/config/corsOptions');
const credentials = require('./src/middleware/credentials');
const { logger } = require('./src/middleware/logEvents');
const errorHandler = require('./src/middleware/errorHandler');
const verifyJWT = require('./src/middleware/verifyJWT');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/airport', require('./src/routes/airport'));
app.use('/connection', require('./src/routes/connection'));

app.use('/register', require('./src/routes/register'));
app.use('/auth', require('./src/routes/auth'));
app.use('/refresh', require('./src/routes/refresh'));
app.use('/logout', require('./src/routes/logout'));
app.use(errorHandler);
app.use(verifyJWT);
app.use('/user', require('./src/routes/user'));


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'client/build')));
//     app.get('*', function(req, res) {
//         res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
// }

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
