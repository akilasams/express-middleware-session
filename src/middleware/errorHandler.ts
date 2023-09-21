import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Crossing through Error Handler");
  res.json({ err });
  next();
};

export default errorHandler;
