process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import swaggerOptions from '@utils/swaggerSettings';
import compression from 'compression';
import config from 'config';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { useExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
// import { connect, set } from 'mongoose';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public prefix: string;

  constructor(controllers: Function[]) {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.env = process.env.NODE_ENV || 'development';
    this.prefix = '/api';

    // this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  // private connectToDatabase() {
  //   if (this.env !== 'production') {
  //     set('debug', true);
  //   }

  //   connect(dbConnection.url, dbConnection.options);
  // }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(controllers: Function[]) {
    const routingControllersOptions = {
      cors: {
        origin: config.get('cors.origin'),
        credentials: config.get('cors.credentials'),
      },
      routePrefix: this.prefix,
      controllers: controllers,
      defaultErrorHandler: false,
    };

    useExpressServer(this.app, routingControllersOptions);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions(routingControllersOptions)));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
