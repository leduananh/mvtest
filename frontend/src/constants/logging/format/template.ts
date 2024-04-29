import _, { TemplateExecutor } from "lodash";

const errorTemplate: TemplateExecutor = _.template("[<%= prefix %>] <%= message %>");

export interface LogErrorData {
  prefix: string;
  message: string;
}

type LogErrorFormat = (data: LogErrorData) => void;

// Function to generate and log the message
export const logErrFormat: LogErrorFormat = (data: LogErrorData) => {
  return errorTemplate(data);
};
