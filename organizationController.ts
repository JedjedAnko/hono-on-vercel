import type { Context } from "hono";
import { HttpStatusCode } from "../utils/httpStatusCodes";
import type { Models } from "../database"
import mongoose from "mongoose";
import type { organizationform } from "../models/organization";

export const organizationController = {
    fetch: async (c: Context) => {
        try {
            const db_models = c.get('db_models') as Models["models"];
            const fetch = await db_models.organization_model.find().lean();
            return c.json({ status: HttpStatusCode.OK , data: fetch, message: "This query was a success!"});
        } catch (error) {
            console.log(error)
            return c.json({status: HttpStatusCode.BAD_REQUEST , err: error, message: "This query is not successful."});
        }
    },

    create: async (c: Context) => {
        try {
            const db_models = c.get('db_models') as Models["models"];
            const body = await c.req.json() as organizationform;
            console.log(body)
            let create = await db_models.organization_model.create(body);
            console.log("created:", create)
            return c.json({status: HttpStatusCode.OK ,data: create, message: "Succesfully Saved!"});
        } catch (error) {
            console.log(error)
            return c.json({status: HttpStatusCode.BAD_REQUEST , err: error, message: "This query is not successful."});
        }   
    },

    patch: async (c: Context) => {
        try {
            const db_models = c.get('db_models') as Models["models"];
            const body = await c.req.json() as organizationform;
            const {_id, ...data} = body;
            let patch = await db_models.organization_model.findOneAndUpdate({_id: new mongoose.Types.ObjectId(_id)}, data, {new: true});
            console.log(patch, "pached data")
            return c.json({status: HttpStatusCode.OK , data: patch, message: "This query was a success!"});
        } catch (error) {
            console.log(error)
            return c.json({status: HttpStatusCode.BAD_REQUEST , err: error, message: "This query is not successful."});
        }
    },
    delete: async (c: Context) => {
        try {
            const id = c.req.param('_id');
            const db_models = c.get('db_models') as Models["models"];
            let remove = await db_models.organization_model.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)});
            return c.json({status: HttpStatusCode.OK , data: remove, message: "This query was a success!"});
        } catch (error) {
            console.log(error)
            return c.json({status: HttpStatusCode.BAD_REQUEST , err: error , message: "This query is not successful."});
        }
    }
}