// Import only what we need from express
import { Router } from "express";
import { Middleware } from "../../../middleware";
import { Validator } from "../../../validate";
import { CartController } from "./cartController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const cartController = new CartController();
const middleware = new Middleware();

router.post("/", middleware.isAuthenticated, cartController.addToCart);
router.get("/", middleware.isAuthenticated, cartController.getCartItems);
router.put("/:id", middleware.isAuthenticated,cartController.updateCart); 
router.delete("/:id", middleware.isAuthenticated, cartController.removeItemFromCart);


// Export the express.Router() instance to be used by server.ts
export const CartRoute: Router = router;
