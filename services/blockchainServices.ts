import {createHash} from 'crypto';

export const getHashString = (message: string) => {
    const hash = createHash('sha256');
    hash.update(message);

    const hashHexa = hash.digest('hex');

    return hashHexa;
}

export const getNonceToHash = (message: string) => {

    var numero1 = Math.floor(Math.random() * 0xFFFF);
    var numero2 = Math.floor(Math.random() * 0xFFFF);
    var hash = "";
    var hashedMessage = "";

    var numero32Bits = (numero1 << 16) | numero2;
    var prueba = '00007832hdsk';
    var prueba2 = '000281973'
    
    while(hash.substring(0,4) !== "0000"){
        hashedMessage = message.concat(numero32Bits.toString()); 
        hash = getHashString(hashedMessage);
        console.log(numero32Bits);
        numero32Bits++;
    }

    return  {
        "hash": hash,
        "Nonce": numero32Bits
    }
    //console.log("Generate Nonce");
}