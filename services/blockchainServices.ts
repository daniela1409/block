import {createHash} from 'crypto';

export const getHashString = (message: string) => {
    const hash = createHash('sha256');
    hash.update(message);

    const hashHexa = hash.digest('hex');

    return hashHexa;
}