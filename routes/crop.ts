import { Hono } from 'hono';
import { logger_color } from '../middlewares/colors.middleware';
import { cropController } from '../controllers/cropController';

const log = logger_color;

export function cropRoutes() {
    log.route("Crops routes loaded.")
    const hono = new Hono();

    hono.post('crop', cropController.create);
    hono.get('crop', cropController.fetch);
    hono.put('crop', cropController.patch);
    hono.delete('crop/:_id', cropController.delete);
    return hono;
}