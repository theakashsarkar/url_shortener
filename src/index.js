const express    = require('express');
//const bp         = require('body-parser');
const signup     = require('./controller/signup');
const login      = require('./controller/login');
const auth       = require('./middlewares/auth');
const app        = express();

//Middlewares
app.use(express.json());
app.use(signup);
app.use(login);
app.use('/api',auth);
const _port      = process.env.PORT || 4000;

app.listen(_port,() =>{
    console.log(`Aplication listing on port,${_port}`);
});

















