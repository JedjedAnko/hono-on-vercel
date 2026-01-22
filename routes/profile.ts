import { Hono } from 'hono';
import { logger_color } from '../middlewares/colors.middleware';
import { ProfileController } from '../controllers/profileController';

const log = logger_color;

export function profileRoutes() {
    log.route("profile routes loaded.")
    const hono = new Hono();

    hono.post('profile', ProfileController.create);
    hono.get('profile', ProfileController.fetch);
    hono.put('profile', ProfileController.patch);
    hono.get('profile/check', ProfileController.checkExisting);
    hono.delete('profile/:_id', ProfileController.delete);
    return hono;
}