import express from 'express';
import { hashController } from '../controllers/blockchainController';

const app = express();
const port = 3000;
app.use(express.json());
app.post('/hash', (req, res) => {
  const hexHash: string = hashController(req.body.message);
  res.send({'hash' : hexHash});
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
