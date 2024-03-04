import express from 'express';
import { generateNonceToHash, hashController } from '../controllers/blockchainController';
import route from './routes/routes';


const app = express();
const port = 3000;
app.use(express.json());

app.use('/api', route);


app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
