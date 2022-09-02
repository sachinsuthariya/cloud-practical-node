// Import only what we need from express
import { Router } from "express";
import { Middleware } from "../../../middleware";
import { Validator } from "../../../validate";
import { AuthController } from "./authController";
import { AuthMiddleware } from "./authMiddleware";
import { AuthModel, AuthenticationModel } from "./authModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();
const middleware = new Middleware();

// authentication
router.post("/sign-up", v.validate(AuthModel), authController.signup); // for internal use only
router.post("/sign-in", v.validate(AuthenticationModel), authMiddleware.checkCredentials, authController.login);


// Export the express.Router() instance to be used by server.ts
export const AuthRoute: Router = router;
