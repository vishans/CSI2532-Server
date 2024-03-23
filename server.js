require('dotenv').config();
const express = require("express");
const { Client } = require('pg');

const clientRoute = require('./routes/clientRoutes');
const hotelRoute = require('./routes/hotelRoutes');


const client = new Client()


const app = express();


app.use(express.json());

 
client.connect()
  .then(() => console.log('Connected successfully to the database'))
  .catch(e => console.error('Failed to connect to the database', e));

   

app.use('/client', clientRoute);
app.use('/hotel', hotelRoute);


app.get('/', (req, res) => {
    res.status(200).send('Server OK');

})



const port = 4000;
app.listen(port, ()=>{
    console.log('Server is online');
})
  