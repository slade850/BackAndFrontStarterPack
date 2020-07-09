import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './modules/user/routes';
const port = process.env.SERVER_PORT;
require('./config/database');

const app = express();
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