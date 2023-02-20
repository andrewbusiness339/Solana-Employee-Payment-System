import { Claimer, Wallet } from '../../models/models.js';
import { Connection, Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl, sendAndConfirmTransaction } from '@solana/web3.js'
import bs58 from 'bs58'

export default {
    Query: {
        // TODO: projection, pagination, sanitization
        getClaimers: (root, args, context, info) => Claimer.find({}),
        getClaimer: async (root, args, context, info) => {
            const res = await Claimer.find({wallet: args.wallet})
            return res
        }
    },
    Mutation: {
        createClaimer: async (root, args, context, info) => {
            const res = await Claimer.create({...args, transactionHash: null});
            return res;
        },
        clickClaim: async(root, args, context, info) => {
            const connection = new Connection(clusterApiUrl("testnet"))
            const secretKey = (await Wallet.findOne({ project: args.project })).secretKey
            const res = await Claimer.findOne({ project: args.project, wallet: args.wallet })
            const houseWallet = Keypair.fromSecretKey(bs58.decode(secretKey))
            let transaction = new Transaction()
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: houseWallet.publicKey,
                    toPubkey: new PublicKey(args.wallet),
                    lamports: res.amount * LAMPORTS_PER_SOL,
                })
            )     
            let hash = await sendAndConfirmTransaction(connection, transaction, [houseWallet])
            console.log(hash)
            res.updateOne({transactionHash: hash})
            return res
        }
    }
};