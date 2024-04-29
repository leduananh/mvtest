import _ from "lodash"; // Import lodash library
import logger from "../app/logger";
import { LogPrefix } from "../constants/logging/format/logPrefix";
import { logErrFormat } from "../constants/logging/format/template";

const checkEnvVariableExist = (variableName: string): string => {
  const envVariable = import.meta.env[variableName];
  if (_.isNil(envVariable) || _.isEmpty(envVariable)) {
    const errorMsg = `Missing ${variableName} environment variable`;
    logError(errorMsg, LogPrefix.EnvVar);
    throw new Error(errorMsg);
  }
  return envVariable;
};

const reduxInfoLog = (message: string): void => {
  logInfo(message, LogPrefix.Redux);
};

const wsInfoLog = (message: string): void => {
  logInfo(message, LogPrefix.WebSocket);
};

const wsErrorLog = (message: string): void => {
  logError(message, LogPrefix.WebSocket);
};

const logError = (message: string, logPrefix: LogPrefix): void => {
  logger.error(logErrFormat({ message, prefix: `${logPrefix} ERROR` }));
};

const logInfo = (message: string, logPrefix: LogPrefix): void => {
  logger.error(logErrFormat({ message, prefix: `${logPrefix} INFO` }));
};

export const commonHelper = {
  checkEnvVariableExist,
  wsErrorLog,
  wsInfoLog,
  reduxInfoLog,
};
