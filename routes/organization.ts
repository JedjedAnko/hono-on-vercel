import { Hono } from 'hono';
import { logger_color } from '../middlewares/colors.middleware';
import { organizationController } from '../controllers/organizationController';

const log = logger_color;

export function organizationRoutes() {
    log.route("Organization routes loaded.")
    const hono = new Hono();

    hono.post('organization', organizationController.create);
    hono.get('organization', organizationController.fetch);
    hono.put('organization', organizationController.patch);
    hono.delete('organization/:_id', organizationController.delete);
    return hono;
}