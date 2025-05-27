import express from 'express';
import dotenv from 'dotenv';
import extractRoutes from './routes/extract';

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use("/api/v1", extractRoutes);

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})