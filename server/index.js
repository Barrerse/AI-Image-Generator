import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

// middleware
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/ai', imageRoutes);

app.get("/", (req, res) => {
    res.send('Hello from server!!!');
});

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server is running on port 8080'))
    } catch (error) {
        console.log(error);
}
}


startServer();