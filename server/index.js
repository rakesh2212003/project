import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import userRoutes from './routes/users/userRoutes.js'

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());

//routes
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})