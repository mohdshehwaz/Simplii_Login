const express = require('express');
const db = require('./config/mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors({
    origin:"*"
}));
app.use('/',require('./routes/index'));

app.listen(process.env.PORT,(err) => {
    if(err){
         console.log("Error occurs while connecting server");
         return;
    }
    console.log("Server is running on the port number -> ", process.env.PORT);
});