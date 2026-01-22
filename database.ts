import mongoose from "mongoose";
import { env, options } from "./utils/config.js";
import { livestockSchema, type livestockform } from "./models/livestock";
import { profileSchema, type profileform } from "./models/profile";
import { profilearchiveSchema, type profilearchiveform } from "./models/profile_archive";
import { cropSchema, type cropform } from "./models/crop";
import { fisherySchema, type fisheryform } from "./models/fishery";
import { machinerySchema, type machineryform  } from "./models/machinery";
import { organizationSchema, type organizationform } from "./models/organization";
import { counterSchema } from "./models/counter";


export class Models {
    models;
    constructor(localDb: mongoose.Connection){
        this.models = {
            livestock_model: localDb.model<livestockform>('livestock', livestockSchema),
            profile_model: localDb.model<profileform>('profile', profileSchema),
            profile_archive_model: localDb.model<profilearchiveform>('profile_archive', profilearchiveSchema),
            crop_model: localDb.model<cropform>('crop', cropSchema),
            counter_model: localDb.model('counter', counterSchema),
            fishery_model: localDb.model<fisheryform>('fishery', fisherySchema),
            machinery_model: localDb.model<machineryform>('machinery', machinerySchema),
            organization_model: localDb.model<organizationform>('organization', organizationSchema),
        }
    }
};

export const connectDB = async () => {
    try {
        const local_connection = await mongoose.createConnection(env.mongo, options).asPromise();
        // const server_connection = await mongoose.createConnection(env.city_db_uri, options).asPromise();

        if (local_connection.readyState !== 1) {
            console.error("Local DB Connection failed");
            return null;
        }
        // if (server_connection.readyState !== 1) {
        //     console.error("Server DB Connection failed");
        //     return null;
        // }

        const models = new Models(local_connection);
        return models;

    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
};