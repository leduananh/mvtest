import _ from "lodash";

// Define the template with placeholders
const socketErrorTemplate = _.template("[SOCKET ERROR] <%= message %>");

// Define the type for the data consumed by the log function
interface SocketErrorData {
  message: string;
}

// Define the type for the log function
type LogSocketErrorFunction = (data: SocketErrorData) => void;

// Function to generate and log the message
const logSocketError: LogSocketErrorFunction = (data) => {
  const logMessage = socketErrorTemplate(data);
  console.error(logMessage);
};

// Example usage:
const errorMessage = "Connection failed";
logSocketError({ message: errorMessage });
