import { Keypair } from '@solana/web3.js';

const keypair = Keypair.generate();
const secretKey = keypair.secretKey;

// Convert to base64 string
const secretKeyBase64 = Buffer.from(secretKey).toString('base64');

console.log('Copy this secret key and add it to your .env file:');
console.log(`PRIVATE_KEY=${secretKeyBase64}`);