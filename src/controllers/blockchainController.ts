import { confirmTheBlock, getBlocksToConfirm, getBlocksToUndermine, getHashString,  undermineBlockService } from "../services/blockchainServices"

export const hashController = async (req: JSON) => {
    return await getHashString(req);    
} 

export const getBlocksController =  async() => {
    return await getBlocksToUndermine();
}

export const undermineBlock = async(req: any) => {
    return await undermineBlockService(req.params.blockId);
}

export const getBlockToConfirmController = async(req: any) => {
    return await getBlocksToConfirm(req.params.blockId);
}

export const confirmBlockController = async(req:any) => {
    return await confirmTheBlock(req.params.blockId);
}
