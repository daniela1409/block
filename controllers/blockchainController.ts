import { getHashString, getNonceToHash } from "../services/blockchainServices"

export const hashController = (req: string) => {
    return getHashString(req);    
} 

export const generateNonceToHash = (req: string) =>{
    return getNonceToHash(req);
}