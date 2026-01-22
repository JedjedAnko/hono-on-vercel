import mongoose from "mongoose";
import { Document } from "mongoose";

const commoditySchema = new mongoose.Schema({
  crop: String,
  size: String,
  heads: String,
  farmType: String,
  organic: Boolean,
  remarks: String,
});

const plotSchema = new mongoose.Schema({
  farmlocBrgy: String,
  farmlocMunicipal: String,
  totalArea: String,
  docNo: String,
  ownerType: String,
  tenantOwnership: String,
  lesseOwnership: String,
  othersOwnership: String,
  ancestralDomain: String,
  agrarianBeneficiary: String,
  commodities: [commoditySchema],
});


export const profileSchema = new mongoose.Schema(
  {
    profile_id: {
      type: String,
      unique: true,
    },
    enrollmentType: { type: String },
    referenceNumber: { type: String },
    surname: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    extensionName: { type: String },
    sex: { type: String },
    address: { type: String },
    street: { type: String },
    barangay: { type: String },
    city: { type: String },
    province: { type: String },
    region: { type: String },
    mobileNumber: { type: String },
    landlineNumber: { type: String },
    dob: { type: Date },
    pobMunicipality: { type: String },
    pobProvince: { type: String },
    pobCountry: { type: String },
    religion: { type: String },
    religionOther: { type: String },
    civilStatus: { type: String },
    spouseName: { type: String },
    motherMaiden: { type: String },
    householdHead: { type: String },
    relationship: { type: String },
    noMale: { type: String },
    noFemale: { type: String },
    education: { type: String },
    pwd: { type: String },
    fourPs: { type: String },
    ipMember: { type: String },
    ipMemberDetails: { type: String },
    govId: { type: String },
    idType: { type: String },
    idNumber: { type: String },
    farmerCoop: { type: String },
    isfarmCoop: { type: String },
    emergencyPerson: { type: String },
    emergencyContact: { type: String },
    mainLivelihood: { type: [String] },
    fisherActivity: { type: [String] },
    youthActivity: { type: [String] },
    farmerActivity: { type: [String] },
    farmworkerActivity: { type: [String] },
    farmGross: { type: String },
    incomeSource: { type: String },
    fileinput: { type: String },
    avatar: { type: String, default: null },
    plots: [plotSchema],
  },
  { strict: false, timestamps: true },
);

export interface ICommodity {
  crop: string;
  size: string;
  heads: string;
  farmType: string;
  organic: boolean;
  remarks: string;
}

export interface IPlot {
  farmlocBrgy: string;
  farmlocMunicipal: string;
  totalArea: string;
  docNo: string;
  ownerType: string;
  tenantOwnership: string;
  lesseOwnership: string;
  othersOwnership: string;
  ancestralDomain: string;
  agrarianBeneficiary: string;
  commodities: ICommodity[];
}
export interface profileform extends Document {
  _id: mongoose.Types.ObjectId;
  profile_id: string;
  enrollmentType: string;
  referenceNumber: string;
  surname: string;
  firstName: string;
  middleName?: string;
  extensionName?: string;
  sex: string;
  address: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
  mobileNumber?: string;
  landlineNumber?: string;
  dob: Date;
  pobMunicipality: string;
  pobProvince: string;
  pobCountry: string;
  religion?: string;
  religionOther?: string;
  civilStatus?: string;
  spouseName?: string;
  motherMaiden?: string;
  householdHead?: string;
  relationship?: string;
  noMale?: string;
  noFemale?: string;
  education?: string;
  pwd?: string;
  fourPs?: string;
  ipMember?: string;
  ipMemberDetails?: string;
  govId?: string;
  idType?: string;
  idNumber?: string;
  farmerCoop?: string;
  isfarmCoop?: string;
  emergencyPerson?: string;
  emergencyContact?: string;
  mainLivelihood?: string[];
  fisherActivity?: string[];
  youthActivity?: string[];
  farmerActivity?: string[];
  farmworkerActivity?: string[];
  farmGross?: string;
  incomeSource?: string;
  avatar: string | null;
  plots: IPlot[];
}
