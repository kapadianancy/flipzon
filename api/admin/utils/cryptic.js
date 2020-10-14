
const crypto = require('crypto'),
algorithm = 'aes-128-cbc',
password = 'AvbSkj3BVbf4o6mdlAofDp0/SD0susEWo0pKdmqas',
salt = 'ABj4PQgf3j5gblQ0iDp0/Gb07ukQWo0a',
iv = 'aAB1jhPQ89o=f619',
inputEncoding = 'utf8',
outputEncoding = 'base64';


// function encrypt(text) {
//     let cipher = crypto.createCipheriv(algorithm,createHashPassword(), iv);
//     let encrypted = cipher.update(text, inputEncoding, outputEncoding)
//     encrypted += cipher.final(outputEncoding);
//     return encrypted;
// }

function createHashPassword(){
  let nodeCrypto = crypto.pbkdf2Sync(Buffer.from(password), Buffer.from(salt), 65536, 32, 'sha1');
  return nodeCrypto || nodeCrypto.toString('hex');
};

// function decrypt(encrypted) {
//     let decipher = crypto.createDecipheriv(algorithm, Buffer.from(createHashPassword(),"hex"), iv)
//     let dec = decipher.update(encrypted, outputEncoding, inputEncoding)
//     dec += decipher.final(inputEncoding);
//     return dec;
// }

// console.log(encrypt('john.doe@gmail.com'));
// console.log(decrypt(encrypt('john.doe@gmail.com')));
// console.log(decrypt("DFQ4eb4ObQAgc59sQqnB/SYVkiKWs0piAqhXnFJvYXo="))

// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
const key = createHashPassword();

function encrypt(text) {
    let newIv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: newIv.toString('hex'), encryptedData: encrypted.toString('hex') };
    // return encrypted.toString('hex');
}

function decrypt(text) {
    try {
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        // let encryptedText = Buffer.from(text, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch(error) {
        console.log(error.message)
        throw "not valid"
    }
}

// console.log(encrypt("asdf"));
// console.log(decrypt({ iv: 'ecca544049f9ba93f4512ef7b3beb654',
// encryptedData: 'f34f9392a369993967e7545f39036581' }))
// 
// console.log(encrypt("bhavik.chavda@gmail.com"));
// console.log(decrypt({ iv: 'ad93d149c692a08d1c63c7f0328f3553',
// encryptedData:
//  '4d8475dfbfad0369efbebd258bae2426a25a8e80c268da7f6b37f22352f72d25' }))
module.exports = {
    encrypt,
    decrypt
}
