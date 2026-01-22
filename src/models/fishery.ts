import mongoose from 'mongoose';
import { Document } from "mongoose";

export const fisherySchema = new mongoose.Schema({
	fish_name: { type: String },
    fish_type: { type: String },
    location: { type: String },
    region: { type: String },
    province: { type: String },
    city_municipality: { type: String },
    barangay: { type: String },
    fishermen_name: { type: String },
    contact_number: { type: String },
    organization: { type: String },
}, { strict: false });

export interface fisheryform extends Document {
   _id: mongoose.Types.ObjectId;
    fish_name: String;
    fish_type: String;
    location: String;
    region: String;
    province: String;
    city_municipality: String;
    barangay: String;
    fishermen_name: String;
    contact_number: String;
    organization: String;
}