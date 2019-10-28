const express    = require('express');
//const bp         = require('body-parser');
const signup     = require('./controller/signup');
const login      = require('./controller/login');
const auth       = require('./middlewares/auth');
const errh       = require('./middlewares/error_handler');
const app        = express();

//Middlewares
app.use(express.json());
app.use('/api',auth);
//Router
app.use(signup);
app.use(login);

app.use(errh);
const _port      = process.env.PORT || 4000;

app.listen(_port,() =>{
    console.log(`Aplication listing on port,${_port}`);
});

















