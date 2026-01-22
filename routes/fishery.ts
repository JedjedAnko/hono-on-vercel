import { Hono } from 'hono';
import { logger_color } from '../middlewares/colors.middleware';
import { fisheryController } from '../controllers/fisheryController';

const log = logger_color;

export function fisheryRoutes() {
    log.route("Fishery routes loaded.")
    const hono = new Hono();

    hono.post('fishery', fisheryController.create);
    hono.get('fishery', fisheryController.fetch);
    hono.put('fishery', fisheryController.patch);
    hono.delete('fishery/:_id', fisheryController.delete);
    return hono;
}