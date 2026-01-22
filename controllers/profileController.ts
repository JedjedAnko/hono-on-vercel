import type { Context } from "hono";
import { HttpStatusCode } from "../utils/httpStatusCodes";
import type { Models } from "../database";
import mongoose from "mongoose";
import type { profileform } from "../models/profile";

export const ProfileController = {
  fetch: async (c: Context) => {
    try {
      const db_models = c.get("db_models") as Models["models"];
      const fetch = await db_models.profile_model.find().lean();
      return c.json({
        status: HttpStatusCode.OK,
        data: fetch,
        message: "This query was a success!",
      });
    } catch (error) {
      console.log(error);
      return c.json({
        status: HttpStatusCode.BAD_REQUEST,
        err: error,
        message: "This query is not successful.",
      });
    }
  },

  // create: async (c: Context) => {
  //     try {
  //         const db_models = c.get('db_models') as Models["models"];
  //         const body = await c.req.json() as profileform;
  //         console.log(body)
  //         let create = await db_models.profile_model.create(body);
  //         console.log("created:", create)
  //         return c.json({status: HttpStatusCode.OK ,data: create, message: "Succesfully Saved!"});
  //     } catch (error) {
  //         console.log(error)
  //         return c.json({status: HttpStatusCode.BAD_REQUEST , err: error, message: "This query is not successful."});
  //     }
  // },
// create: async (c: Context) => {
//   try {
//     const db_models = c.get("db_models") as any;
//     const body = (await c.req.json()) as profileform;

//     // 1. ATTEMPT TO FIND EXISTING RECORD
//     // First by profile_id (if provided), then by unique name combination
//     let existingProfile = null;

//     if (body.profile_id) {
//       existingProfile = await db_models.profile_model.findOne({ profile_id: body.profile_id }).lean();
//     } else {
//       // If no ID, check if this person already exists in the system
//       existingProfile = await db_models.profile_model.findOne({
//         profile_id: body.profile_id,
       
//       }).lean();
//     }
//  //  firstName: { $regex: new RegExp(`^${body.firstName}$`, 'i') },
//         // surname: { $regex: new RegExp(`^${body.surname}$`, 'i') },
//         // middleName: { $regex: new RegExp(`^${body.middleName}$`, 'i') },
      
//     // SCENARIO 1: RECORD EXISTS -> ARCHIVE OLD, UPDATE CURRENT
//     if (existingProfile) {
//       // Capture the ID we found so the new entry keeps it
//       const targetProfileId = existingProfile.profile_id;

//       // Move old data to Archive
//       const { _id, ...archiveData } = existingProfile;
//       await db_models.profile_archive_model.create({
//         ...archiveData,
//         archivedAt: new Date(),
//         archiveReason: "Data Overwritten - History Archived"
//       });

//       // Update the main profile (Keep the old profile_id)
//       const { _id: _, profile_id: __, ...updateData } = body;
//       const updated = await db_models.profile_model.findOneAndUpdate(
//         { profile_id: targetProfileId },
//         { $set: { ...updateData, profile_id: targetProfileId } },
//         { new: true }
//       );

//       return c.json({
//         status: HttpStatusCode.OK,
//         data: updated,
//         message: "Old data archived. Profile updated under existing ID.",
//       });
//     }

//     // SCENARIO 2: BRAND NEW ENTRY -> GENERATE ID
//     const counter = await db_models.counter_model.findOneAndUpdate(
//       { id: "profile_id" },
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true }
//     );

//     const nextId = `AGRI-${String(counter.seq).padStart(5, "0")}`;

//     const newProfile = await db_models.profile_model.create({
//       ...body,
//       profile_id: nextId,
//     });

//     return c.json({
//       status: HttpStatusCode.OK,
//       data: newProfile,
//       message: `New profile created with ID: ${nextId}`,
//     });

//   } catch (error) {
//     console.error("Create Error:", error);
//     return c.json({
//       status: HttpStatusCode.BAD_REQUEST,
//       err: error,
//       message: "Operation failed.",
//     });
//   }
// },

create: async (c: Context) => {
  try {
    const db_models = c.get("db_models") as any;
    const body = (await c.req.json()) as profileform;

    console.log("Incoming Request Body Profile ID:", body.profile_id);

    let existingProfile = null;

    // 1. Try matching by profile_id first
    if (body.profile_id && typeof body.profile_id === 'string' && body.profile_id.trim() !== "") {
      const cleanId = body.profile_id.trim();
      existingProfile = await db_models.profile_model.findOne({ profile_id: cleanId }).lean();
      
      if (existingProfile) console.log("Match found by Profile ID:", cleanId);
    }

    // 2. Fallback: Match by Name if ID lookup failed
    if (!existingProfile) {
      console.log("No match by ID. Checking by Name...");
      existingProfile = await db_models.profile_model.findOne({
        firstName: { $regex: new RegExp(`^${body.firstName.trim()}$`, 'i') },
        surname: { $regex: new RegExp(`^${body.surname.trim()}$`, 'i') },
        middleName: { $regex: new RegExp(`^${body.middleName?.trim()}$`, 'i') },
        extensionName: { $regex: new RegExp(`^${body.extensionName?.trim()}$`, 'i') }
      }).lean();
      
      if (existingProfile) console.log("Match found by Name! ID is:", existingProfile.profile_id);
    }

    // --- SCENARIO: UPDATE & ARCHIVE ---
    if (existingProfile) {
      const targetId = existingProfile.profile_id;

      // Archive the exact snapshot currently in the DB
      const { _id, ...archiveData } = existingProfile;
      await db_models.profile_archive_model.create({
        ...archiveData,
        archivedAt: new Date(),
        archiveReason: "System matched existing record - archiving old version"
      });

      // Update the main profile
      // We exclude _id and __v to prevent Mongoose version errors
      const { _id: _, profile_id: ___, ...updateData } = body;
      
      const updated = await db_models.profile_model.findOneAndUpdate(
        { profile_id: targetId },
        { $set: { ...updateData, profile_id: targetId } },
        { new: true }
      );

      return c.json({
        status: HttpStatusCode.OK,
        data: updated,
        message: "Record found. Previous version archived."
      });
    }

    // --- SCENARIO: BRAND NEW RECORD ---
    console.log("No existing record found. Generating new Sequential ID...");
    const counter = await db_models.counter_model.findOneAndUpdate(
      { id: "profile_id" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const nextId = `AGRI-${String(counter.seq).padStart(5, "0")}`;

    const newProfile = await db_models.profile_model.create({
      ...body,
      profile_id: nextId,
    });

    return c.json({
      status: HttpStatusCode.OK,
      data: newProfile,
      message: `Successfully created new profile: ${nextId}`,
    });

  } catch (error) {
    console.error("CRITICAL ERROR in Create Route:", error);
    return c.json({ status: HttpStatusCode.BAD_REQUEST, message: "Server Error" });
  }
},

  patch: async (c: Context) => {
    try {
      const db_models = c.get("db_models") as Models["models"];
      const body = (await c.req.json()) as profileform;
      const { _id, ...data } = body;
      let patch = await db_models.profile_model.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(_id) },
        data,
        { new: true },
      );
      console.log(patch, "pached data");
      return c.json({
        status: HttpStatusCode.OK,
        data: patch,
        message: "This query was a success!",
      });
    } catch (error) {
      console.log(error);
      return c.json({
        status: HttpStatusCode.BAD_REQUEST,
        err: error,
        message: "This query is not successful.",
      });
    }
  },
  delete: async (c: Context) => {
    try {
      const id = c.req.param("_id");
      const db_models = c.get("db_models") as Models["models"];
      let remove = await db_models.profile_model.findByIdAndDelete({
        _id: new mongoose.Types.ObjectId(id),
      });
      return c.json({
        status: HttpStatusCode.OK,
        data: remove,
        message: "This query was a success!",
      });
    } catch (error) {
      console.log(error);
      return c.json({
        status: HttpStatusCode.BAD_REQUEST,
        err: error,
        message: "This query is not successful.",
      });
    }
  },
  // checkExisting: async (c: Context) => {
  //   try {
  //     const db_models = c.get("db_models") as Models["models"];
  //     const firstName = c.req.query("firstName");
  //     const middleName = c.req.query("middleName");
  //     const surname = c.req.query("surname");
  //     const extensionName = c.req.query("extensionName");

  //     const query = {
  //       firstName: { $regex: new RegExp(`^${firstName}$`, "i") },
  //       middleName: { $regex: new RegExp(`^${middleName}$`, "i") },
  //       surname: { $regex: new RegExp(`^${surname}$`, "i") },
  //       extensionName: { $regex: new RegExp(`^${extensionName}$`, "i") },
  //     };

  //     // Find the newest version (-1) so we migrate the most recent data
  //     const existing = await db_models.profile_model
  //       .findOne(query)
  //       .sort({ createdAt: -1 })
  //       .lean();

  //     if (!existing) {
  //       return c.json(
  //         { exists: false, message: "No member found" },
  //         HttpStatusCode.OK as any,
  //       );
  //     }

  //     return c.json({ exists: true, data: existing });
  //   } catch (error) {
  //     console.log(error);
  //     return c.json({
  //       status: HttpStatusCode.BAD_REQUEST,
  //       message: "Query failed",
  //     });
  //   }
  // },
 checkExisting: async (c: Context) => {
    try {
        const db_models = c.get("db_models") as Models["models"];
        const firstName = c.req.query("firstName");
        const middleName = c.req.query("middleName");
        const surname = c.req.query("surname");

        // Search for everyone with the same 3 names, regardless of extension
        const query = {
            firstName: { $regex: new RegExp(`^${firstName}$`, "i") },
            middleName: { $regex: new RegExp(`^${middleName}$`, "i") },
            surname: { $regex: new RegExp(`^${surname}$`, "i") },
        };

        const matches = await db_models.profile_model
            .find(query)
            .sort({ extensionName: 1 }) // Sort alphabetically by extension
            .lean();

        if (matches.length === 0) {
            return c.json({ exists: false });
        }

        return c.json({ exists: true, data: matches }); // data is now an ARRAY
    } catch (error) {
        return c.json({ status: 400, message: "Query failed" });
    }
},
};