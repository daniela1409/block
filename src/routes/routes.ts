import express from 'express'; 
import { generateNonceToHash, hashController } from '../../controllers/blockchainController';

const route = express.Router();


route.post('/sendTransaction', async (req: express.Request, res: express.Response) => {
   
    res.status(200).send("prueba");
});

route.post('/hash', (req, res) => {
    const hexHash: string = hashController(req.body.message);
    res.send({'hash' : hexHash});
});
route.post('/findNonce', (req, res) => {
    const response = generateNonceToHash(req.body.message);
    res.send(response);
});


export default route;