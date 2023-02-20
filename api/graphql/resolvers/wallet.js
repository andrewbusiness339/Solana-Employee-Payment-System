import { Wallet } from '../../models/models.js';
import { Connection, PublicKey, Keypair } from '@solana/web3.js'
import bs58 from "bs58"

export default {
    Query: {
        // TODO: projection, pagination, sanitization
        // need to return only publicKey
        getWallets: (root, args, context, info) => Wallet.find({}),
        // + getWalletByProjectName
        // Wallet + owner
    },
    Mutation: {
        createWallet: async (root, args, context, info) => {
            const keypair = Keypair.generate()
            const res = await Wallet.create({project: args.project, secretKey: bs58.encode(keypair.secretKey)})
            return res;
        }
    }
};