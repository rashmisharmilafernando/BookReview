import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import * as SchemaType from "../types/SchemaTypes";

const ReviewSchema = new mongoose.Schema<SchemaType.IBranch>({
    title: {type: String, required: true},
    author: {type: String, required: true},
    rating: {type: String, required: true},
    reviewText: {type: String, required: true},
    dateAdded: {type: String, required: true},
  })

const ReviewModel = mongoose.model('Review', ReviewSchema);
export default ReviewModel;