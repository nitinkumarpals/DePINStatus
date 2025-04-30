// apps/validator/src/keyGen.ts
import { Keypair } from "@solana/web3.js";
import * as fs from 'fs';
import * as path from 'path';

function generateSolanaKeypair() {
  // Generate a new keypair
  const keypair = Keypair.generate();

  // Convert secret key to array for .env file
  const secretKeyArray = Array.from(keypair.secretKey);

  // Prepare output
  const output = {
    publicKey: keypair.publicKey.toBase58(),
    privateKeyForEnv: secretKeyArray
  };

  console.log(' Solana Keypair Generated:');
  console.log('Public Key:', output.publicKey);
  console.log('Private Key (for .env):', JSON.stringify(output.privateKeyForEnv));

  // Optional: Write to .env file
  const envPath = path.resolve(__dirname, '../.env');
  const envContent = `PRIVATE_KEY=${JSON.stringify(output.privateKeyForEnv)}\n`;
  
  fs.writeFileSync(envPath, envContent);
  console.log(' Private key saved to .env file');

  return output;
}

// Run the key generation
generateSolanaKeypair();
