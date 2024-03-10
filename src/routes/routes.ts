import express from 'express'; 
import { confirmBlockController, getBlockToConfirmController, getBlocksController, hashController, undermineBlock } from '../controllers/blockchainController';

const route = express.Router();


route.post('/undermineBlock/:blockId', async (req: express.Request, res: express.Response) => {
    const response = await undermineBlock(req);
    res.status(200).send("prueba");
});
route.post('/sendTransaction', async (req, res) => {
    const hexHash = await hashController(req.body);
    res.send({'hash' : hexHash});
});
route.get('/getBlocks', async(req, res) => {
    const response =  await getBlocksController();
    res.status(200).send(response);
});
route.get('/getBlocksToConfirm', async(req, res) => {
    const response = await getBlockToConfirmController(req);
    res.status(200).send(response);
});
route.post('/toConfirmBlock/:blockId', async(req, res) => {
    const response = await confirmBlockController(req);
    res.status(200).send(response);
});

export default route;