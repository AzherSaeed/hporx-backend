const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const allRoutes = require('./Routes/allRoutes');
const connectionDB = require('./db');


dotenv.config({path : './config.env'});

connectionDB();

const app = express();
app.use(express.json())

app.use(cors())
app.options('*' , cors())



app.use('/api' , allRoutes);

const PORT = process.env.PORT || 3001; 

app.get('/', (req, res) => res.send('Hello World'))


app.listen(PORT , () => console.log(`Server is running in ${process.env.APP_ENV} mode on port ${PORT}`) )