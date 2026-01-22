import mongoose from 'mongoose';
import { Document } from "mongoose";

export const cropSchema = new mongoose.Schema({
  crop_name: { type: String },
	scientific_name: { type: String },
	variety: { type: String },
	category: { type: String },
	location: { type: String },
	region: { type: String },
	province: { type: String },
	city_municipality: { type: String },
	soil_type: { type: String },
	climate_type: { type: String },
	area_hectares: { type: Number },
	fertilizer_used: { type: String },
	pesticide_used: { type: String },
	irrigation_type: { type: String },
	farmer_name: { type: String },
	contact_number: { type: String },
	organization: { type: String },
}, { strict: false });

export interface cropform extends Document {
   _id: mongoose.Types.ObjectId;
  	crop_name: String;
	scientific_name: String;
	variety: String;
	category: String;
	location: String;
	region: String;
	province: String;
	city_municipality: String;
	soil_type: String;
	climate_type: String;
	area_hectares: Number;
	fertilizer_used: String;
	pesticide_used: String;
	irrigation_type: String;
	farmer_name: String;
	contact_number: String;
	organization: String;
}