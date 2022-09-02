import bcryptjs = require("bcryptjs");
import { Request, Response } from "express";
import { Constants } from "../../../config/constants";
import { AuthUtils } from "./authUtils";

export class AuthMiddleware {
    private authUtils: AuthUtils = new AuthUtils();

    public checkCredentials = async (req: any, res: Response, next: () => void) => {
        // get user detail by mobile
        const user = await this.authUtils.checkUserExist({email: req.body.email});

        // check credentials matches or not
        if (user &&
            await bcryptjs.compare(req.body.password, user.password)) {

            req.body._authentication = user;
            next();
        } else {
            return res.status(Constants.FAIL_CODE).json(
                { error: req.t("INVALID_CREDENTIALS"), code: Constants.UNAUTHORIZED_CODE },
            );
        }
    }
}
