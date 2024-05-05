import { ErrorRequestHandler } from "express";
import JsonReponse from "../lib/JsonReponse";

const ErrorHandleMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err, "from error miidleware");
  return JsonReponse.error(err.message);
};

export default ErrorHandleMiddleware;
