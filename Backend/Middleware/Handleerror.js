class Handleerror extends Error{
    constructor(message,statuscode){
      super(message),
      this.name = "HandleError"
      this.statuscode = statuscode,
      Error.captureStackTrace(this,Handleerror)
    }
}
export default Handleerror;