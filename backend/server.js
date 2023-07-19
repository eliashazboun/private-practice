const express = require('express');
const app = express();
const mongoose = require('mongoose');
const client = require('./routes/clients');
const appointment = require('./routes/appointments');
const profile = require('./routes/profile');
const login = require('./routes/login');
const signup = require('./routes/signup');
const video = require('./routes/video');
const admindash = require('./routes/admindash')
const cors = require('cors')


require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/clients', client);
app.use('/api/appointments', appointment)
app.use('/api/profile', profile)
app.use('/api/login', login)
app.use('/api/signup', signup)
app.use('/api/video', video)
app.use('/api/admindash', admindash)

app.get('/', (req,res) => {
    res.json({msg: 'Welcome to the app'})

});
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB...');

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}...`)
    });
})
.catch((err) => {console.log('An error has occurred...' + err)});