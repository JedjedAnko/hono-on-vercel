import { Hono } from 'hono';
import { logger_color } from '../middlewares/colors.middleware';
import { machineryController } from '../controllers/machineryController';

const log = logger_color;

export function machineryRoutes() {
    log.route("machinery routes loaded.")
    const hono = new Hono();

    hono.post('machinery', machineryController.create);
    hono.get('machinery', machineryController.fetch);
    hono.put('machinery', machineryController.patch);
    hono.delete('machinery/:_id', machineryController.delete);
    return hono;
}