import { Nitro } from "nitropack";
import mongoose from 'mongoose';

export default async (_nitroApp: Nitro) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/eCommerceDB')
    console.log("Conectado a MongoDB")
  } catch (e) {
    console.error(e);
  }
}
