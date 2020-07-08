require('dotenv').config({path: ('apiConfig.env')});
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./modules/user/routes');
const port = process.env.SERVER_PORT;
require('./config/database');

// cors config for use cookie 
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/', (req, res) => {
    res.send('wellcome to API')
})

app.use('/api/user', userRoutes);

app.listen(port, console.log(`server started on port ${port}`));