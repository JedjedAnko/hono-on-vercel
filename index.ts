import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { sessionMiddleware, CookieStore } from 'hono-sessions';
import { cors } from 'hono/cors';
import { setCookie } from 'hono/cookie';
import { logger_color } from './middlewares/colors.middleware.js';
import { dbModelsMiddleware } from './middlewares/database.middleware.js';
import { customLogger } from './middlewares/logger.middleware.js';
import { livestockRoutes } from './routes/livestock.js';
import { profileRoutes } from './routes/profile.js';
import { cropRoutes } from './routes/crop.js';
import { fisheryRoutes } from './routes/fishery.js';
import { machineryRoutes } from './routes/machinery.js';
import { organizationRoutes } from './routes/organization.js';

const app = new Hono()
const log = logger_color;

const main = async() => {
  try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      const store = new CookieStore();
      app.use(
          '*',
          sessionMiddleware({
              store: store,
              encryptionKey: '(*#$&**@PATOT0YA#*#$HIIT$$4PNUP4S%^#@!%##$&#!*&^$)', // Replace with a strong key!
          })
      );
      app.use(dbModelsMiddleware);
      app.use(customLogger());2
      app.use('*', async (c, next) => {
          console.log('Request:', c.req.method, c.req.path);
          await next();
      });

      app.use(
          '/agri-sys/api/*',
          cors({
              origin: '*', // Or your frontend URL
              allowMethods: ['POST', 'GET', 'OPTIONS'],
              credentials: true,
          })
      );

      app.route('/agri-sys/api', livestockRoutes());
      app.route('/agri-sys/api', profileRoutes());
      app.route('/agri-sys/api', cropRoutes());
      app.route('/agri-sys/api', fisheryRoutes());
      app.route('/agri-sys/api', machineryRoutes());
      app.route('/agri-sys/api', organizationRoutes());
      console.log('agri routes registered');
      
      app.get('/agri-sys/api', (c) => {
          setCookie(c, 'cookie_name', 'cookie_monster', {
              path: '/agri-sys',
              secure: false,
              domain: 'localhost',
              httpOnly: true,
              maxAge: 1000
          })
          return c.text('agri-sys api testing success!')
      })
      app.onError((err, c) => {
          console.error('Global error:', err);
          return c.text('Internal Server Error', 500);
      });

      serve({
          fetch: app.fetch,
          port: 2025
        }, (info) => {
          log.connect(`agri-sys server is running on port: ${info.port}`)
          console.log('Server is fully ready to accept requests!');
      });
  } catch(error) {
      console.error('Error during app setup:', error);
      process.exit(1);
  }
};


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});


main();