import { Hono } from 'hono';
import { logger_color } from '../middlewares/colors.middleware';
import { livestockController } from '../controllers/livestockController';

const log = logger_color;

export function livestockRoutes() {
    log.route("livestock routes loaded.")
    const hono = new Hono();

    hono.post('livestock', livestockController.create);
    hono.get('livestock', livestockController.fetch);
    hono.put('livestock', livestockController.patch);
    hono.delete('livestock/:_id', livestockController.delete);
    return hono;
}