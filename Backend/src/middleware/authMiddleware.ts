import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// export const protect = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     jwt.verify(token, process.env.JWT_SECRET as string);
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };







// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};