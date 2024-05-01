class ApiError extends Error {
  statusCode?: number;
  message: string;

  constructor(statusCode: number = 500, message: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ApiError;
