import mongoose, { Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface IBranch extends mongoose.Document {
    title: string,
    author: string,
    rating: string,
    reviewText: string,
    dateAdded:string
}

