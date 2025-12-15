class Handleerror extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "HandleError";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default Handleerror;
