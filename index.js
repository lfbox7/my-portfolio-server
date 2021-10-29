const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./src/routes/user.routes'))

mongoose.connect('mongodb://localhost:27017/ContactDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(port, () => {
            console.log('MongoDB connected. Express server is running')
    });
})
