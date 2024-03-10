import express from 'express';
import route from './routes/routes';
import connectToDatabase from './database';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());

connectToDatabase();

console.log(process.env.URL_MONGODB)
app.use('/api', route);


app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
