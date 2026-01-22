import type { Context, Next } from "hono";
import { connectDB } from "../database";
import { logger_color } from "./colors.middleware";

const log = logger_color;

const mongodb = await connectDB();
if(!mongodb) throw new Error("Error connecting to mongodb")
log.db("Successfully connected to DB!");

export const dbModelsMiddleware = async (c: Context, next: Next) => {
    if (mongodb) {
        ("Models decorated.")
        c.set('db_models', mongodb.models);
        await next();
    } else {
        log.error('Database connection failed.')
        return c.text('Database models not available.', 500);
    }
};