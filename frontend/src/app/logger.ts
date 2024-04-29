// src/logger.ts
import winston, { Logger } from "winston";

const logger: Logger = winston.createLogger({
  level: import.meta.env.VITE_LOG_LEVEL,
  format: winston.format.prettyPrint(),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
