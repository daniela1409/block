import { getHashString } from "../services/blockchainServices"

export const hashController = (req: string) => {
    return getHashString(req);    
} 