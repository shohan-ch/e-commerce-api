import { NextFunction, Request, Response } from "express";
import JsonReponse from "../lib/JsonReponse";

const JsonResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  JsonReponse.setResponse(res);
  next();
};

export default JsonResponseMiddleware;
