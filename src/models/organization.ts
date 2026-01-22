import mongoose from 'mongoose';
import { Document } from "mongoose";

export const organizationSchema = new mongoose.Schema({
    org_name: { type: String },
    org_type: { type: String },
    org_address: { type: String },
    org_contact: { type: String },
    org_email: { type: String },
    org_date_established: { type: String },
    org_sector: { type: String },
    org_members: { type: String },
    org_registration_no: { type: String },
    org_status: { type: String },
    org_leader_contact: { type: String },
    org_leader_name: { type: String },
    org_leader_email: { type: String },
    org_remarks: { type: String },
}, { strict: false });

export interface organizationform extends Document {
   _id: mongoose.Types.ObjectId;
    org_name: string;
    org_type: string;
    org_address: string;
    org_contact: string;
    org_email: string;
    org_date_established: string;
    org_sector: string;
    org_members: string;
    org_registration_no: string;
    org_status: string;
    org_leader_contact: string;
    org_leader_name: string;
    org_leader_email: string;
    org_remarks?: string;
}