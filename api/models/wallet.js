import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const walletSchema = new Schema(
	{
		project: {
			type: String,
			unique: true,
		},
		secretKey: {
			type: String,
			unique: true,
		}
	},
	{
		timestamps: true
	}
);

const Wallet = model('wallet', walletSchema);

export default Wallet;