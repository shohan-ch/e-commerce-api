import { NextFunction, Request, Response } from "express";
import JwtAuth from "../lib/JwtAuth";

const authMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCookie = req.cookies.userId;
    // console.log(userCookie);
    const token =
      req.body.token || req.headers.authorization || req.params.token;
    if (!token || token === undefined) {
      throw Error("Access token not found!");
    }
    let extractToken = token.includes("Bearer") ? token.split(" ")[1] : token;
    let decodeToken = await JwtAuth.decodeToken(extractToken, "accessToken");
    if (decodeToken && userCookie) {
      req.authUser = decodeToken;
      next();
    } else {
      throw Error("Not authorized user");
    }
  } catch (error) {
    res.status(401).json({ status: false, code: 401, msg: error.message });
    console.log(error.message);
  }
};

export default authMiddleware;
