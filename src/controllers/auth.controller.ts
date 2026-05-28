import { Request, Response } from "express";
import { loginUser, generateAdminCredentials } from "../services/auth.service";
import { sendError, sendSuccess } from "../utils/response.util";

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, username, identifier, password } = req.body;
      const loginIdentifier = identifier || email || username;
      if (!loginIdentifier || !password) {
        return sendError(res, 400, "Username/email and password are required");
      }

      const payload = await loginUser(loginIdentifier, password);
      return sendSuccess(res, payload);
    } catch (error) {
      return sendError(res, 401, error instanceof Error ? error.message : "Unable to login");
    }
  },

  async generateAdmin(req: Request, res: Response) {
    try {
      const { secret } = req.body;
      if (!secret) {
        return sendError(res, 400, "Admin generation secret is required");
      }
      const credentials = await generateAdminCredentials(secret);
      return sendSuccess(res, { credentials });
    } catch (error) {
      return sendError(res, 401, error instanceof Error ? error.message : "Unable to generate admin user");
    }
  }
};
