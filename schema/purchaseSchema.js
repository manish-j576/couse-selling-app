import mongoose, { Mongoose } from "mongoose";
const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // model name from Schema.js
    required: true,
  },
  createrid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin", // model name from Schema.js
    required: true,
  },
});


export const PurchaseModel = mongoose.model("purchase",purchaseSchema)