// Import only what we need from express
import { Router } from "express";
import { Middleware } from "../../../middleware";
import { Validator } from "../../../validate";
import { ProductController } from "./productController";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const productController = new ProductController();
const middleware = new Middleware();

router.post("/", middleware.isAuthenticated, productController.createProduct);
router.get("/", middleware.isAuthenticated, productController.getProductList);
router.get("/:productId", middleware.isAuthenticated, productController.getProductDetail);
router.put("/:productId", middleware.isAuthenticated, productController.updateProduct);
router.delete("/:productId", middleware.isAuthenticated, productController.deleteProduct);

// Export the express.Router() instance to be used by server.ts
export const ProductRoute: Router = router;
