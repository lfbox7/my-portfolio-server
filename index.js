const express = require('express');
const cors = require('cors');
require("dotenv").config({ path: './src/config/config.env' });
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(require('./src/routes/user.routes'));
const dbo = require('./src/config/conn');

app.listen(port, () => {
    dbo.connectToServer((e) => {
        if (e)
            console.error(e);
    });
    console.log(`Server is running on port: ${port}`);
});

