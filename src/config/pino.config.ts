/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request } from 'express';

export const pinoConfig = {
  pinoHttp: {
    customProps: (req: Request, res: Response) => ({
      context: 'HTTP',
    }),
    customLogLevel: function (req: Request, res: Response, err) {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        return 'silent';
      }
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      }
      return 'error';
    },
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        colorize: true,
      },
    },
    customLevels: {
      http: 10,
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      fatal: 60,
    },
    serializers: {
      req: (req: Request) => ({
        id: req.id,
        method: req.method,
        url: req.url,
      }),
      res: (res: Response) => ({
        statusCode: res.statusCode,
        json: res.json,
      }),
    },
  },
};
