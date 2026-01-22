
import type { Context, Next } from 'hono';
import { logger_color } from  "./colors.middleware";

const logs = logger_color();
// Custom logger function
const log = (message: string) => {
  const now = new Date().toISOString();
  const location = 'Bislig, Caraga, Philippines'; // Remembered location
  logs.info(`[${now}] [${location}] ${(message)}`);
};

export const customLogger = () => {
  return async (c: Context, next: Next) => {
    const startTime = Date.now();
    const { method, url } = c.req;

    log(`Request started: ${method} ${url}`);

    await next();

    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const { status } = c.res;

    log(`Request completed: ${method} ${url} - Status: ${status} - Response Time: ${responseTime}ms`);
  };
};