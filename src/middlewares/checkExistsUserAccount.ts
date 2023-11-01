import { Request, Response, NextFunction } from "express";
import { userServices } from "../services/userServices";

export const checkExistsUserAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.headers

  try {
      const userExists = await userServices.findByUsername(username as string)

      if (!userExists) {
          return res.status(404).json({ message: "User not found" })
      }

      next()
  } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "An error occurred" })
  }
}