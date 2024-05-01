import _ from "lodash"; // Import lodash library
import log from "../app/logger";
import { LogPrefix } from "../constants/logging/format/logPrefix";
import { logErrFormat } from "../constants/logging/format/template";

const checkEnvVariableExist = (envVariable: string): string => {
  if (_.isNil(envVariable) || _.isEmpty(envVariable)) {
    const errorMsg = `Missing ${envVariable} environment variable`;
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

const apiErrorLog = (message: string): void => {
  logError(message, LogPrefix.Api);
};

const apiInfoLog = (message: string): void => {
  logInfo(message, LogPrefix.Api);
};

const wsErrorLog = (message: string): void => {
  logError(message, LogPrefix.WebSocket);
};

const logError = (message: string, logPrefix: LogPrefix): void => {
  log.error(logErrFormat({ message, prefix: `${logPrefix} ERROR` }));
};

const logInfo = (message: string, logPrefix: LogPrefix): void => {
  log.info(logErrFormat({ message, prefix: `${logPrefix} INFO` }));
};

export const commonHelper = {
  checkEnvVariableExist,
  wsErrorLog,
  wsInfoLog,
  apiErrorLog,
  apiInfoLog,
  reduxInfoLog
};
