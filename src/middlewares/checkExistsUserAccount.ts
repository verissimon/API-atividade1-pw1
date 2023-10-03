import { Request, Response, NextFunction } from "express";
import users from "../data/database"
import { NotFoundError } from "../helpers/apiErrors";

export const checkExistsUserAccount = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username } = req.headers
    const user = users.find( ubody => ubody.username === username)
    if (!user) {
      throw new NotFoundError("User not found")
    }
    next()
}
