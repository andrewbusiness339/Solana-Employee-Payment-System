import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const claimerSchema = new Schema(
  {
    project: {type: String},
    name: {type: String},
    amount: {type: String},
    wallet: {type: String},
    period: {type: String},
    time: {type: String},
    transactionHash: {type:String}
  },
  {
    timestamps: true
  }
);

const Claimer = model('claimer', claimerSchema);

export default Claimer;