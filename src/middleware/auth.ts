import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Crossing auth middleware");
  next();
};

export default authMiddleware;
