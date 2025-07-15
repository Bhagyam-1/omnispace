import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI!;

if (!uri) {
    throw new Error("Please provide a MongoDB URI");
}


let cached = (global as any).mongoose;

if(!cached) {
    cached = (global as any).mongoose = {client: null, clientPromise: null};
}

const dbConnect = async() => {
    if(cached.client) {
        return cached.clientPromise;
    }

    if(!cached.clientPromise) {
        cached.clientPromise = mongoose.connect(uri, {
            bufferCommands: false
        }) 
    }

    cached.client = await cached.clientPromise;
    return cached.client;
}

export default dbConnect;