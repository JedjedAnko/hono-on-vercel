import mongoose from 'mongoose';
import { Document } from "mongoose";

export const livestockSchema = new mongoose.Schema({
    livestock_name: { type: String},
    livestock_type: { type: String},
    location: { type: String},
    breed: { type: String},
    health_status: { type: String},
    health_remarks: { type: String},
    last_vet: { type: String },
    Vaxrecord: { type: String},
    organization: { type: String},
    org_remarks: { type: String},
}, {strict: false})

export interface livestockform extends Document {
    _id: mongoose.Types.ObjectId;
    livestock_name: String,
    livestock_type: String,
    location: String,
    breed: String,
    health_status: String,
    health_remarks: String,
    last_vet: String,
    Vaxrecord: String,
    organization: String,
    org_remarks: String,
}

