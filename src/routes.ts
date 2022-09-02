import * as express from "express";
import * as l10n from "jm-ez-l10n";
import { Middleware } from "./middleware";
import { AuthRoute } from "./v1/modules/auth/authRoute";
import { ProductRoute } from "./v1/modules/product/productRoute";
import { CartRoute } from "./v1/modules/cart/cartRoute"


export class Routes {
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public defaultRoute(req: express.Request, res: express.Response) {
    res.json({
      message: "Hello !",
    });
  }

  public path() {
    const router = express.Router();
    const middleware = new Middleware();
    router.use("/auth", AuthRoute);
    router.use("/product", ProductRoute);
    router.use("/cart", CartRoute);

    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: l10n.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}
